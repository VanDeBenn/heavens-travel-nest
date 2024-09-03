import { Module } from '@nestjs/common';
import { CategoriesSomehelpfulFactsService } from './categories-somehelpful-facts.service';
import { CategoriesSomehelpfulFactsController } from './categories-somehelpful-facts.controller';

@Module({
  controllers: [CategoriesSomehelpfulFactsController],
  providers: [CategoriesSomehelpfulFactsService]
})
export class CategoriesSomehelpfulFactsModule {}
