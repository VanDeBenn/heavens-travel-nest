import { Module, forwardRef } from '@nestjs/common';
import { XenditService } from './xendit.service';
import { UsersModule } from '#/users/users.module';
import { BookingsModule } from '#/bookings/bookings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Xendit } from './entities/xendit.entity';
import { Payment } from '#/payment/entities/payment.entity';
// import { XenditController } from './xendit.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    UsersModule,
    forwardRef(() => BookingsModule),
  ],
  providers: [XenditService],
  // controllers: [XenditController],
  exports: [XenditService],
})
export class XenditModule {}
