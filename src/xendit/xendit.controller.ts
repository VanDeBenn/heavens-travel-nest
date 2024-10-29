import { Controller, Post, Body, Get, Query, HttpCode } from '@nestjs/common';
import { XenditService } from './xendit.service';

@Controller('xendit')
export class XenditController {
  constructor(private readonly xenditService: XenditService) {}

  // create single payment link di dasboard
// {
//   "external_id": "Heavens-travel",
//   "amount": 1650000,
//   "items": [
//     {
//       "name": "Garuda Wisnu Kencana",
//       "quantity": 1,
//       "price": 150000,
//       "category": "Destination",
//       "url": "https://yourwebsite.com/gwk-tourism"
//     },
//     {
//       "name": "Nusa Penida",
//       "quantity": 1,
//       "price": 1500000,
//       "category": "Destination",
//       "url": "https://yourwebsite.com/gwk-tourism"
//     }
//   ]
// }

  // Endpoint untuk membuat invoice baru
  @Post('create-invoice')
  async createInvoice(
    @Body('externalId') externalId: string,
    @Body('amount') amount: number,
    @Body('email') email: string,
  ) {
    return this.xenditService.createInvoice(externalId, amount, email);
  }

  // Endpoint untuk mengecek status invoice berdasarkan ID
  @Get('invoice-status')
  async getInvoiceStatus(@Query('invoiceId') invoiceId: string) {
    return this.xenditService.getInvoiceStatus(invoiceId);
  }

  // Endpoint untuk menangani webhook notifikasi dari Xendit
  @Post('webhook')
  @HttpCode(200) // Memberikan status 200 OK secara eksplisit
  async handleWebhook(@Body() payload: any) {
    console.log('Webhook received:', payload);
    // Tambahkan logika pemrosesan payload sesuai kebutuhan
    return { message: 'Webhook received' }; // Respon cepat ke Xendit
  }
}
