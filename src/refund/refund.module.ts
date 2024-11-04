import { Module, forwardRef } from '@nestjs/common';
import { RefundService } from './refund.service';
import { RefundController } from './refund.controller';
import { Refund } from './entities/refund.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '#/payment/entities/payment.entity';
import { BookingsModule } from '#/bookings/bookings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Refund, Payment]),
    forwardRef(() => BookingsModule),
  ],
  controllers: [RefundController],
  providers: [RefundService],
  exports: [RefundService],
})
export class RefundModule {}
