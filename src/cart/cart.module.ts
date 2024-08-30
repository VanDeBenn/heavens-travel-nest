import { Module } from '@nestjs/common';
import { CartsService } from './cart.service';
import { CartsController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartModule {}
