import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CompressionTaskModule } from './compression-task/compression-task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permet d'accéder aux variables d'environnement partout
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().uri().required(), // Valide que MONGO_URI est bien une URI
        PORT: Joi.number().default(3000), // Définit un port par défaut
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Récupère l'URI depuis .env
      }),
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CompressionTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
