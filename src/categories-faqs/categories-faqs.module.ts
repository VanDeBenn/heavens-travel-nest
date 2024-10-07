import { Module } from '@nestjs/common';
import { CategoriesFaqsService } from './categories-faqs.service';
import { CategoriesFaqsController } from './categories-faqs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesFaq } from './entities/categories-faqs.entity';
import { DestinationsModule } from '#/destinations/destinations.module';
import { HotelsModule } from '#/hotels/hotels.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesFaq]),DestinationsModule, HotelsModule],
  controllers: [CategoriesFaqsController],
  providers: [CategoriesFaqsService],
  exports: [CategoriesFaqsService, TypeOrmModule]
})
export class CategoriesFaqsModule {}
