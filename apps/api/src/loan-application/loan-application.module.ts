import { Module } from '@nestjs/common';
import { KnexProvider } from '../common/providers/knex.provider.js';
import { LoanApplicationController } from './loan-application.controller.js';
import { LoanApplicationService } from './loan-application.service.js';
import { LoanApplicationRepository } from './loan-application.repository.js';

@Module({
  controllers: [LoanApplicationController],
  exports: [KnexProvider],
  providers: [LoanApplicationService, LoanApplicationRepository, KnexProvider],
})
export class LoanApplicationModule {}
