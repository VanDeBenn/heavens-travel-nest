import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import Xendit from 'xendit-node';

@Injectable()
export class XenditService {
  private invoice: any;

  constructor() {
    const xendit = new Xendit({
      secretKey: process.env.XENDIT_API_KEY,
    });

    this.invoice = xendit.Invoice;
  }

  async createInvoice(externalId: string, amount: number, email: string, description: string = 'Pembayaran Produk di Aplikasi') {
    try {
      return await this.invoice.createInvoice({
        externalID: externalId,
        amount,
        payerEmail: email,
        description,
      });
    } catch (error) {
      throw new HttpException(`Failed to create invoice: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async getInvoiceStatus(invoiceId: string) {
    try {
      return await this.invoice.getInvoice({ invoiceID: invoiceId });
    } catch (error) {
      throw new HttpException(`Failed to fetch invoice status: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
