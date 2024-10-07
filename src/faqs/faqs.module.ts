import { Module } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqsController } from './faqs.controller';
import { Faq } from './entities/faq.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesFaqsModule } from '#/categories-faqs/categories-faqs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Faq]),CategoriesFaqsModule],
  controllers: [FaqsController],
  providers: [FaqsService],
  exports: [FaqsService]
})
export class FaqsModule {}
