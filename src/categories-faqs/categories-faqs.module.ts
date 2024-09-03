import { Module } from '@nestjs/common';
import { CategoriesFaqsService } from './categories-faqs.service';
import { CategoriesFaqsController } from './categories-faqs.controller';

@Module({
  controllers: [CategoriesFaqsController],
  providers: [CategoriesFaqsService]
})
export class CategoriesFaqsModule {}
