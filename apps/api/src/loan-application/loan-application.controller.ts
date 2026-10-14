import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GetBaseResponseDto } from '../common/dtos/get-base-response.dto.js';
import { CreateLoanApplicationDto } from './dto/create-loan-application.dto.js';
import { GetLoanApplicationQueryDto } from './dto/get-loan-application-query.dto.js';
import { LoanApplicationResponseDto } from './dto/loan-application-response.dto.js';
import { LoanApplicationService } from './loan-application.service.js';

@Controller('loan-application')
export class LoanApplicationController {
  constructor(
    private readonly loadApplicationService: LoanApplicationService,
  ) {}

  @Get()
  async findPaged(
    @Query() query: GetLoanApplicationQueryDto,
  ): Promise<GetBaseResponseDto<LoanApplicationResponseDto>> {
    return this.loadApplicationService.findPaged(query);
  }

  @Post()
  create(@Body() createLoanApplicationDto: CreateLoanApplicationDto) {
    return this.loadApplicationService.create(createLoanApplicationDto);
  }
}
