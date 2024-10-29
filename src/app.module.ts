import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { UsersModule } from './users/users.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { LoggerModule } from 'nestjs-pino';
import { HealthModule } from './health/health.module';
import configuration from './config/configuration';
import * as pino from 'pino';
import { SeederModule } from '#/seeder/seeder.module';
import { RolesModule } from './roles/roles.module';
import { DestinationsModule } from './destinations/destinations.module';
import { BlogsModule } from './blogs/blogs.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomHotelsModule } from './room-hotels/room-hotels.module';
import { BookingsModule } from './bookings/bookings.module';
import { CartModule } from './cart/cart.module';
import { CitysModule } from './cities/cities.module';
import { ProvincesModule } from './provinces/provinces.module';
import { CountriesModule } from './countries/countries.module';
import { FotoDestinationsModule } from './foto-destinations/foto-destinations.module';
import { FotoHotelsModule } from './foto-hotels/foto-hotels.module';
import { FotoRoomHotelsModule } from './foto-room-hotels/foto-room-hotels.module';
import { ReportsModule } from './reports/reports.module';
import { FotoReportsModule } from './foto-reports/foto-reports.module';
import { ReviewsModule } from './reviews/reviews.module';
import { FotoReviewsModule } from './foto-reviews/foto-reviews.module';
import { RefundModule } from './refund/refund.module';
import { BookingDetailModule } from './booking-detail/booking-detail.module';
import { SomehelpfulFactsModule } from './somehelpful-facts/somehelpful-facts.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ReplyReviewsModule } from './reply-reviews/reply-reviews.module';
import { CategoriSomehelpfulFactModule } from './categories-somehelpful-facts/categories-somehelpful-facts.module';
import { PropertyPoliciesModule } from './property-policies/property-policies.module';
import { CategoriesServiceAmenitiesModule } from './categories-service-amenities/categories-service-amenities.module';
import { ServiceAmenitiesModule } from './service-amenities/service-amenities.module';
import { CategoriesFaqsModule } from './categories-faqs/categories-faqs.module';
import { FaqsModule } from './faqs/faqs.module';
import { CategoriesNearbyLocationModule } from './categories-nearby-location/categories-nearby-location.module';
import { NearbyLocationModule } from './nearby-location/nearby-location.module';
import { RoomTypeModule } from './room-type/room-type.module';
import { XenditModule } from './xendit/xendit.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        base: undefined,
        genReqId: (req) => {
          return req['x-correlation-id'];
        },
        redact: {
          paths: [
            'req.headers.authorization',
            'req.headers["user-agent"]',
            'req.headers.accept',
            'req.headers["accept-encoding"]',
            'req.headers["accept-language"]',
            'req.headers.host',
            'req.headers.connection',
            'req.headers.cookie',
            'req.headers["sec-ch-ua"]',
            'req.headers["sec-ch-ua-mobile"]',
            'req.headers["sec-ch-ua-platform"]',
            'req.headers["upgrade-insecure-requests"]',
            'req.headers["sec-fetch-site"]',
            'req.headers["sec-fetch-mode"]',
            'req.headers["sec-fetch-user"]',
            'req.headers["sec-fetch-dest"]',
            'req.headers["if-none-match"]',
            'req.headers["cache-control"]',
            'req.query',
            'req.params',
            'req.remoteAddress',
            'req.remotePort',
            'res.headers["access-control-allow-origin"]',
            'res.headers["content-type"]',
            'res.headers["content-length"]',
            'res.headers["etag"]',
          ],
          remove: true,
        },
        timestamp: pino.stdTimeFunctions.isoTime,
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        // install 'pino-pretty' package in order to use the following option
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_CLIENT: Joi.valid('mysql', 'postgres'),
        DATABASE_HOST: Joi.string(),
        DATABASE_NAME: Joi.string(),
        DATABASE_USERNAME: Joi.string(),
        DATABASE_PASSWORD: Joi.string().empty('').default(''),
        DATABASE_PORT: Joi.number().default(5432),
      }),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<'postgres' | 'mysql'>('database.client'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          entities: [],
          synchronize: configService.get<string>('env') === 'development',
          autoLoadEntities: true,
          logging: false,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      inject: [ConfigService],
    }),
    // SeederModule,
    UsersModule,
    HealthModule,
    RolesModule,
    DestinationsModule,
    BlogsModule,
    HotelsModule,
    RoomHotelsModule,
    BookingsModule,
    CartModule,
    CitysModule,
    ProvincesModule,
    CountriesModule,
    FotoDestinationsModule,
    FotoHotelsModule,
    FotoRoomHotelsModule,
    ReportsModule,
    FotoReportsModule,
    ReviewsModule,
    FotoReviewsModule,
    RefundModule,
    BookingDetailModule,
    SomehelpfulFactsModule,
    AuthModule,
    WishlistModule,
    ReplyReviewsModule,
    CategoriSomehelpfulFactModule,
    PropertyPoliciesModule,
    CategoriesServiceAmenitiesModule,
    ServiceAmenitiesModule,
    CategoriesFaqsModule,
    FaqsModule,
    CategoriesNearbyLocationModule,
    NearbyLocationModule,
    RoomTypeModule,
    XenditModule,
  ],
})
export class AppModule {}
