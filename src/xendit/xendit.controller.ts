// import { Controller, Post, Body, Get, Query, HttpCode } from '@nestjs/common';
// import { XenditService } from './xendit.service';
// import { CreateXenditDto } from './dto/create-xendit.dto';

// @Controller('https://api.xendit.co/v2')
// export class XenditController {
//   constructor(private readonly xenditService: XenditService) {}

//   // Endpoint untuk membuat invoice baru
//   @Post('invoices')
//   async createInvoice(
//     @Body() createXenditDto: CreateXenditDto,
//   ) {
//     return this.xenditService.createInvoice(createXenditDto);
//   }

//   // Endpoint untuk mengecek status invoice berdasarkan ID
//   // @Get('invoice-status')
//   // async getInvoiceStatus(@Query('invoiceId') invoiceId: string) {
//   //   return this.xenditService.getInvoiceStatus(invoiceId);
//   // }

//   // Endpoint untuk menangani webhook notifikasi dari Xendit
//   @Post('webhook')
//   @HttpCode(200) // Memberikan status 200 OK secara eksplisit
//   async handleWebhook(@Body() payload: any) {
//     // console.log('Webhook received:', payload);
//     // Tambahkan logika pemrosesan payload sesuai kebutuhan
//     return { message: 'Webhook received' }; // Respon cepat ke Xendit
//   }
// }
