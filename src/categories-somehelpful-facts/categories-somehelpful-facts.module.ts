import { Module } from '@nestjs/common';
import { CategoriSomehelpfulFact } from './entities/categories-somehelpful-fact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriSomehelpfulFactService } from './categories-somehelpful-facts.service';
import { CategoriSomehelpfulFactController } from './categories-somehelpful-facts.controller';
import { HotelsModule } from '#/hotels/hotels.module';


@Module({
  imports: [TypeOrmModule.forFeature([CategoriSomehelpfulFact]), HotelsModule],
  controllers: [CategoriSomehelpfulFactController],
  providers: [CategoriSomehelpfulFactService],
  exports:[CategoriSomehelpfulFactService]
})
export class CategoriSomehelpfulFactModule {}
