import { Module } from '@nestjs/common';
import { FotoHotelsService } from './foto-hotels.service';
import { FotoHotelsController } from './foto-hotels.controller';

@Module({
  controllers: [FotoHotelsController],
  providers: [FotoHotelsService]
})
export class FotoHotelsModule {}
