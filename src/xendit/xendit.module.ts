import { Module, forwardRef } from '@nestjs/common';
import { XenditService } from './xendit.service';
import { UsersModule } from '#/users/users.module';
import { BookingsModule } from '#/bookings/bookings.module';
// import { XenditController } from './xendit.controller';

@Module({
  imports: [UsersModule, forwardRef(() => BookingsModule)],
  providers: [XenditService],
  // controllers: [XenditController],
  exports: [XenditService],
})
export class XenditModule {}
