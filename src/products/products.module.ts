import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import {UploadService} from "../utils/upload_image";
import {CompressionImageService} from "../utils/compression_image"; // Adjust the path as necessary

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, UploadService, CompressionImageService],
})
export class ProductsModule {}
