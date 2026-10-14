import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as knex from 'knex';
import { GetBaseInfoDto } from '../common/dtos/get-base-info.dto.js';
import { GetBaseResponseDto } from '../common/dtos/get-base-response.dto.js';
import { KNEX_CONNECTION } from '../common/providers/knex.provider.js';

import { LOAN_APPLICATION_STATUS } from './constants/loan-application.status.constants.js';
import { CreateLoanApplicationDto } from './dto/create-loan-application.dto.js';
import { GetLoanApplicationQueryDto } from './dto/get-loan-application-query.dto.js';
import { LoanApplicationResponseDto } from './dto/loan-application-response.dto.js';
import { LoanApplicationRepository } from './loan-application.repository.js';
import { CreateInstallmentData } from './types/create-installment-data.type.js';

@Injectable()
export class LoanApplicationService {
  constructor(
    private readonly repository: LoanApplicationRepository,
    @Inject(KNEX_CONNECTION) private readonly knex: knex.Knex,
  ) {}

  async findPaged(
    query: GetLoanApplicationQueryDto,
  ): Promise<GetBaseResponseDto<LoanApplicationResponseDto>> {
    const { page = 1, limit = 20, status, createdFrom, createdTo } = query;

    const offset = (page - 1) * limit;

    const filters = { status, createdFrom, createdTo };

    const [totalCount, rows] = await Promise.all([
      this.repository.count(filters),
      this.repository.findPaged(filters, limit, offset),
    ]);

    const items: LoanApplicationResponseDto[] = rows.map((row) => ({
      id: row.id,
      clientId: row.clientId,
      requestedAmount: Number(row.requestedAmount),
      termMonths: row.termMonths,
      status: row.status,
      createdAt: row.createdAt,
      client: {
        id: row.clientId,
        fullName: row.clientFullName ?? '',
        dni: row.clientDni ?? '',
      },
    }));

    const totalPages = Math.ceil(totalCount / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const info: GetBaseInfoDto = {
      page,
      pageSize: limit,
      prevPage: hasPrevPage ? page - 1 : undefined,
      nextPage: hasNextPage ? page + 1 : undefined,
      hasPrevPage,
      hasNextPage,
    };

    return {
      items,
      info,
      totalCount,
    };
  }

  create(createLoanApplicationDto: CreateLoanApplicationDto) {
    return this.knex.transaction(async (trx) => {
      const exists = await this.repository.clientExists(
        createLoanApplicationDto.clientId,
        trx,
      );

      if (!exists) {
        throw new NotFoundException(
          `Client with id ${createLoanApplicationDto.clientId} not found.`,
        );
      }

      const loanApplicationId = await this.repository.create(
        {
          client_id: createLoanApplicationDto.clientId,
          requested_amount: createLoanApplicationDto.requestedAmount,
          status: createLoanApplicationDto.status,
          term_months: createLoanApplicationDto.termMonths,
        },
        trx,
      );

      if (
        createLoanApplicationDto.status === LOAN_APPLICATION_STATUS.APPROVED
      ) {
        const installments = this.generateInstallments(
          loanApplicationId,
          createLoanApplicationDto.requestedAmount,
          createLoanApplicationDto.termMonths,
        );

        await this.repository.createInstallments(installments, trx);
      }

      return { id: loanApplicationId };
    });
  }

  private generateInstallments(
    loanApplicationId: number,
    requestedAmount: number,
    termMonths: number,
  ) {
    const installmentAmount = Number((requestedAmount / termMonths).toFixed(2));

    const installments: CreateInstallmentData[] = [];

    const startDate = new Date();

    for (let i = 1; i <= termMonths; i++) {
      const dueDate = new Date(startDate);

      dueDate.setMonth(dueDate.getMonth() + i);

      installments.push({
        loan_application_id: loanApplicationId,
        due_date: dueDate,
        amount: installmentAmount,
        paid: false,
      });
    }

    return installments;
  }
}
