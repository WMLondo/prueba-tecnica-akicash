import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { KnexProvider } from './common/providers/knex.provider.js';
import { LoanApplicationModule } from './loan-application/loan-application.module.js';

@Module({
  imports: [LoanApplicationModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  exports: [KnexProvider],
  providers: [KnexProvider],
})
export class AppModule {}
