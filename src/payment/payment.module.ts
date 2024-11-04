import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentsController } from './payment.controller';
import { PaymentsService } from './payment.service';
import { UsersModule } from '#/users/users.module';
import { BookingsModule } from '#/bookings/bookings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    UsersModule,
    forwardRef(() => BookingsModule),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService, TypeOrmModule],
})
export class PaymentModule {}
