import { Inject, Injectable } from '@nestjs/common';
import * as knex from 'knex';
import { KNEX_CONNECTION } from '../common/providers/knex.provider.js';
import { ClientQueryFilters } from './types/client-query-filters.type.js';
import { ClientRow } from './types/client-row.type.js';

@Injectable()
export class ClientRepository {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: knex.Knex) {}

  async findPaged(
    filters: ClientQueryFilters,
    limit: number,
    offset: number,
  ): Promise<ClientRow[]> {
    return this.buildBaseQuery(filters)
      .clone()
      .select(
        'c.id',
        'c.full_name as fullName',
        'c.dni',
        'c.monthly_income as monthlyIncome',
        'c.created_at as createdAt',
      )
      .orderBy('c.full_name', 'asc')
      .limit(limit)
      .offset(offset);
  }

  async count(filters: ClientQueryFilters): Promise<number> {
    const result = await this.buildBaseQuery(filters).count('* as count');
    const [row] = result as unknown as Array<{ count: string | number }>;

    return Number(row.count);
  }

  private buildBaseQuery(filters: ClientQueryFilters) {
    const query = this.knex<ClientRow>('client as c');

    if (filters.search) {
      query.where('c.full_name', 'like', `%${filters.search}%`);
    }

    return query;
  }
}
