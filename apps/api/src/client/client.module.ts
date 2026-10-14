import { Module } from '@nestjs/common';
import { KnexProvider } from '../common/providers/knex.provider.js';
import { ClientController } from './client.controller.js';
import { ClientRepository } from './client.repository.js';
import { ClientService } from './client.service.js';

@Module({
  controllers: [ClientController],
  exports: [KnexProvider],
  providers: [ClientService, ClientRepository, KnexProvider],
})
export class ClientModule {}
