// import { Test, TestingModule } from '@nestjs/testing';
// import { XenditService } from './xendit.service';

// describe('XenditService', () => {
//   let service: XenditService;

//   const mockXendit = {
//     Invoice: {
//       createInvoice: jest.fn().mockResolvedValue({ 
//         externalID: 'test-001', 
//         status: 'PENDING' 
//       }),
//       getInvoice: jest.fn().mockResolvedValue({ 
//         invoiceID: 'inv-123', 
//         status: 'PAID' 
//       }),
//     },
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         XenditService,
//         {
//           provide: 'Xendit', // Menggunakan token yang sesuai untuk mock
//           useValue: mockXendit,
//         },
//       ],
//     }).compile();

//     service = module.get<XenditService>(XenditService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should create an invoice and return it', async () => {
//     const externalId = 'test-001';
//     const amount = 50000;
//     const email = 'user@example.com';

//     const result = await service.createInvoice(externalId, amount, email);
//     expect(result).toEqual({
//       externalID: 'test-001',
//       status: 'PENDING',
//     });
//     expect(mockXendit.Invoice.createInvoice).toHaveBeenCalledWith({
//       externalID: externalId,
//       amount,
//       payerEmail: email,
//       description: 'Pembayaran Produk di Aplikasi',
//     });
//   });

//   it('should get invoice status and return it', async () => {
//     const invoiceId = 'inv-123';

//     const result = await service.getInvoiceStatus(invoiceId);
//     expect(result).toEqual({
//       invoiceID: 'inv-123',
//       status: 'PAID',
//     });
//     expect(mockXendit.Invoice.getInvoice).toHaveBeenCalledWith({ invoiceID: invoiceId });
//   });
// });
