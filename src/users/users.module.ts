import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { RolesModule } from '#/roles/roles.module';
import { DistrictsModule } from '#/districts/districts.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule, DistrictsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
