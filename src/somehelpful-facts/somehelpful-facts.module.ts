import { Module } from '@nestjs/common';
import { SomehelpfulFactsService } from './somehelpful-facts.service';
import { SomehelpfulFactsController } from './somehelpful-facts.controller';

@Module({
  controllers: [SomehelpfulFactsController],
  providers: [SomehelpfulFactsService]
})
export class SomehelpfulFactsModule {}
