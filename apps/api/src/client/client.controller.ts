import { Controller, Get, Query } from '@nestjs/common';
import { GetBaseResponseDto } from '../common/dtos/get-base-response.dto.js';
import { ClientService } from './client.service.js';
import { ClientResponseDto } from './dto/client-response.dto.js';
import { GetClientQueryDto } from './dto/get-client-query.dto.js';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findPaged(
    @Query() query: GetClientQueryDto,
  ): Promise<GetBaseResponseDto<ClientResponseDto>> {
    return this.clientService.findPaged(query);
  }
}
