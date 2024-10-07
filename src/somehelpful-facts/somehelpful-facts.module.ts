import { Module } from '@nestjs/common';
import { SomehelpfulFactsService } from './somehelpful-facts.service';
import { SomehelpfulFactsController } from './somehelpful-facts.controller';
import { SomehelpfulFact } from './entities/somehelpful-fact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriSomehelpfulFactModule } from '#/categories-somehelpful-facts/categories-somehelpful-facts.module';

@Module({
  imports: [TypeOrmModule.forFeature([SomehelpfulFact]), CategoriSomehelpfulFactModule],
  controllers: [SomehelpfulFactsController],
  providers: [SomehelpfulFactsService],
  exports: [SomehelpfulFactsService],
})
export class SomehelpfulFactsModule {}
