import { Test, TestingModule } from '@nestjs/testing';
import { XenditController } from './xendit.controller';
import { XenditService } from './xendit.service';

describe('XenditController', () => {
  let controller: XenditController;
  let xenditService: XenditService;

  const mockXenditService = {
    createInvoice: jest.fn((externalId, amount, email) => {
      return { externalId, amount, email, status: 'PENDING' };
    }),
    getInvoiceStatus: jest.fn((invoiceId) => {
      return { invoiceId, status: 'PAID' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XenditController],
      providers: [
        {
          provide: XenditService,
          useValue: mockXenditService,
        },
      ],
    }).compile();

    controller = module.get<XenditController>(XenditController);
    xenditService = module.get<XenditService>(XenditService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call createInvoice and return invoice details', async () => {
    const externalId = 'test-001';
    const amount = 50000;
    const email = 'user@example.com';

    const result = await controller.createInvoice(externalId, amount, email);
    expect(result).toEqual({
      externalId,
      amount,
      email,
      status: 'PENDING',
    });
    expect(mockXenditService.createInvoice).toHaveBeenCalledWith(externalId, amount, email);
  });

  it('should call getInvoiceStatus and return invoice status', async () => {
    const invoiceId = 'inv-123';

    const result = await controller.getInvoiceStatus(invoiceId);
    expect(result).toEqual({ invoiceId, status: 'PAID' });
    expect(mockXenditService.getInvoiceStatus).toHaveBeenCalledWith(invoiceId);
  });
});
