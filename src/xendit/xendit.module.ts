import { Module } from '@nestjs/common';
import { XenditService } from './xendit.service';
import { XenditController } from './xendit.controller';

@Module({
  providers: [XenditService],
  controllers: [XenditController],
  exports: [XenditService]
})
export class XenditModule {}
