import { BookingsService } from '#/bookings/bookings.service';
import { UsersService } from '#/users/users.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { randomUUID } from 'crypto';

@Injectable()
export class XenditService {
  constructor(
    private readonly userService: UsersService,
    private readonly bookingService: BookingsService,
  ) {}
  private readonly xenditUrl = 'https://api.xendit.co/v2/invoices';

  async createInvoice(dto: {
    items?: {
      name: string;
      quantity: number;
      price: number;
      category: string;
      url: string;
    }[];
    user_id: string;
    payer_email: string;
    bookingId: string;
  }) {
    const user = await this.userService.findOne(dto.user_id);
    const email = user?.email;
    const booking = await this.bookingService.findOne(dto.bookingId);
    const bookingDetails = booking?.bookingdetails;
    const invoiceId = randomUUID();
    const external_id = `heavens-travel-${invoiceId}`;

    if (!bookingDetails) {
      throw new Error('No booking details found for this booking ID');
    }

    const items = bookingDetails.map((detail: any) => {
      const cart = detail.cart;
      const destination = cart.destination;

      return {
        name: destination?.name,
        quantity: cart.quantityAdult + cart.quantityChildren,
        price:
          destination?.priceAdult * cart.quantityAdult +
          destination?.priceChildren * cart.quantityChildren,
        category: 'Destination',
        url: `${process.env.FRONTEND_URL}/destinations/detail/${destination?.id}`,
      };
    });

    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

    try {
      const response = await axios.post(
        this.xenditUrl,
        {
          external_id: external_id,
          user_id: user,
          amount: totalAmount,
          description: 'no refund',
          payer_email: email,
          items,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          auth: {
            username: process.env.XENDIT_SECRET_KEY,
            password: '',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Xendit Error:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || 'Unknown error from Xendit',
      );
    }
  }
}
