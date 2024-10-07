import { Module } from '@nestjs/common';
import { CategoriesFaqsService } from './categories-faqs.service';
import { CategoriesFaqsController } from './categories-faqs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesFaq } from './entities/categories-faqs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesFaq])],
  controllers: [CategoriesFaqsController],
  providers: [CategoriesFaqsService],
  exports: [CategoriesFaqsService, TypeOrmModule]
})
export class CategoriesFaqsModule {}
