import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { RolesModule } from '#/roles/roles.module';
import { CitysModule } from '#/cities/cities.module';
import { City } from '#/cities/entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, City]), RolesModule, CitysModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
