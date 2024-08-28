import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { UsersModule } from '#/users/users.module';
import { DestinationsModule } from '#/destinations/destinations.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), UsersModule, DestinationsModule],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
