import { Module } from '@nestjs/common';
import { SomehelpfulFactsService } from './somehelpful-facts.service';
import { SomehelpfulFactsController } from './somehelpful-facts.controller';
import { SomehelpfulFact } from './entities/somehelpful-fact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SomehelpfulFact])],
  controllers: [SomehelpfulFactsController],
  providers: [SomehelpfulFactsService],
})
export class SomehelpfulFactsModule {}
