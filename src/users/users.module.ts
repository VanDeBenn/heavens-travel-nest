import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { RolesModule } from '#/roles/roles.module';
import { CitysModule } from '#/cities/cities.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule, CitysModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
