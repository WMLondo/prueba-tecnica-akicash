import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { it, vi } from 'vitest';
import { KNEX_CONNECTION } from '../common/providers/knex.provider.js';
import { LOAN_APPLICATION_STATUS } from './constants/loan-application.status.constants.js';
import { CreateLoanApplicationDto } from './dto/create-loan-application.dto.js';
import { LoanApplicationRepository } from './loan-application.repository.js';
import { LoanApplicationService } from './loan-application.service.js';

describe('LoanApplicationService', () => {
  let service: LoanApplicationService;
  let repository: {
    clientExists: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    createInstallments: ReturnType<typeof vi.fn>;
  };

  const mockKnex = {
    transaction: vi.fn((cb) => cb({})),
  };

  beforeEach(async () => {
    repository = {
      clientExists: vi.fn(),
      create: vi.fn(),
      createInstallments: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanApplicationService,
        {
          provide: LoanApplicationRepository,
          useValue: repository,
        },
        {
          provide: KNEX_CONNECTION,
          useValue: mockKnex,
        },
      ],
    }).compile();

    service = module.get(LoanApplicationService);
  });

  it('should create a loan application when client exists', async () => {
    repository.clientExists.mockResolvedValue(true);
    repository.create.mockResolvedValue(42);

    const dto: CreateLoanApplicationDto = {
      clientId: 1,
      requestedAmount: 5000,
      termMonths: 12,
      status: LOAN_APPLICATION_STATUS.PENDING,
    };

    const result = await service.create(dto);

    expect(result).toEqual({ id: 42 });
    expect(repository.clientExists).toHaveBeenCalledWith(1, expect.anything());
    expect(repository.create).toHaveBeenCalled();
    expect(repository.createInstallments).not.toHaveBeenCalled();
  });

  it('should create installments when status is approved', async () => {
    repository.clientExists.mockResolvedValue(true);
    repository.create.mockResolvedValue(10);

    const dto: CreateLoanApplicationDto = {
      clientId: 1,
      requestedAmount: 12000,
      termMonths: 12,
      status: LOAN_APPLICATION_STATUS.APPROVED,
    };

    await service.create(dto);

    expect(repository.createInstallments).toHaveBeenCalledTimes(1);

    const installments = repository.createInstallments.mock.calls[0][0];
    expect(installments).toHaveLength(12);
    expect(installments[0].amount).toBe(1000);
    expect(installments[0].paid).toBe(false);
  });

  it('should throw NotFoundException when client does not exist', async () => {
    repository.clientExists.mockResolvedValue(false);

    const dto: CreateLoanApplicationDto = {
      clientId: 999,
      requestedAmount: 5000,
      termMonths: 12,
      status: LOAN_APPLICATION_STATUS.PENDING,
    };

    await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    await expect(service.create(dto)).rejects.toThrow(
      'Client with id 999 not found',
    );
    expect(repository.create).not.toHaveBeenCalled();
  });
});
