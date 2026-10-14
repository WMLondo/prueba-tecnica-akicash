import { Inject, Injectable } from '@nestjs/common';
import * as knex from 'knex';
import { KNEX_CONNECTION } from '../common/providers/knex.provider.js';

import { CreateInstallmentData } from './types/create-installment-data.type.js';

import { LoanApplicationResponseDto } from './dto/loan-application-response.dto.js';
import { CreateLoanApplicationData } from './types/create-loan-application-data.type.js';
import { LoanApplicationQueryFilters } from './types/loan-application-query-filters.type.js';
import { LoanApplicationRow } from './types/loan-application-row.type.js';

@Injectable()
export class LoanApplicationRepository {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: knex.Knex) {}

  async findPaged(
    filters: LoanApplicationQueryFilters,
    limit: number,
    offset: number,
  ): Promise<LoanApplicationRow[]> {
    return this.buildBaseQuery(filters)
      .clone()
      .select(
        'la.id',
        'la.client_id as clientId',
        'la.requested_amount as requestedAmount',
        'la.term_months as termMonths',
        'la.status',
        'la.created_at as createdAt',
        'c.full_name as clientFullName',
        'c.dni as clientDni',
      )
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);
  }

  async count(filters: LoanApplicationQueryFilters): Promise<number> {
    const [{ count }] = await this.buildBaseQuery(filters).count('* as count');

    return Number(count);
  }

  async create(
    data: CreateLoanApplicationData,
    trx?: knex.Knex.Transaction,
  ): Promise<number> {
    const query = trx ?? this.knex;

    const [id] = await query('loan_application').insert(data);

    return id;
  }

  async createInstallments(
    installments: CreateInstallmentData[],
    trx?: knex.Knex.Transaction,
  ) {
    if (installments.length === 0) return;

    const query = trx ?? this.knex;

    await query('installment').insert(installments);
  }

  async clientExists(
    clientId: number,
    trx?: knex.Knex.Transaction,
  ): Promise<boolean> {
    const query = trx ?? this.knex;

    const client = await query('client').where({ id: clientId }).first();

    return !!client;
  }

  private buildBaseQuery(filters: LoanApplicationQueryFilters) {
    const query = this.knex<LoanApplicationResponseDto>(
      'loan_application as la',
    ).leftJoin('client as c', 'la.client_id', 'c.id');

    if (filters.status) {
      query.where('la.status', filters.status);
    }

    if (filters.createFrom) {
      query.where('la.created_at', '>=', filters.createFrom);
    }

    if (filters.createdTo) {
      query.where('la.created_at', '<=', filters.createdTo);
    }

    return query;
  }
}
