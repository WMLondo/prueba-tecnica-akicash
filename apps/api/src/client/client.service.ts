import { Injectable } from '@nestjs/common';
import { GetBaseInfoDto } from '../common/dtos/get-base-info.dto.js';
import { GetBaseResponseDto } from '../common/dtos/get-base-response.dto.js';
import { ClientRepository } from './client.repository.js';
import { ClientResponseDto } from './dto/client-response.dto.js';
import { GetClientQueryDto } from './dto/get-client-query.dto.js';

@Injectable()
export class ClientService {
  constructor(private readonly repository: ClientRepository) {}

  async findPaged(
    query: GetClientQueryDto,
  ): Promise<GetBaseResponseDto<ClientResponseDto>> {
    const { page = 1, limit = 20 } = query;
    const search = query.search?.trim() || undefined;

    const offset = (page - 1) * limit;
    const filters = { search };

    const [totalCount, rows] = await Promise.all([
      this.repository.count(filters),
      this.repository.findPaged(filters, limit, offset),
    ]);

    const items: ClientResponseDto[] = rows.map((row) => ({
      id: row.id,
      fullName: row.fullName,
      dni: row.dni,
      monthlyIncome: Number(row.monthlyIncome),
      createdAt: row.createdAt,
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
}
