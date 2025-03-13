import {Module} from '@nestjs/common';
import {CompressionTaskService} from './compression-task.service';
import {ScheduleModule} from "@nestjs/schedule";
import {MongooseModule} from "@nestjs/mongoose";
import {Product, ProductSchema} from "../products/schemas/product.schema";
import {UploadService} from "../utils/upload_image";
import {CompressionImageService} from "../utils/compression_image";

@Module({
    imports: [ScheduleModule.forRoot(),
        MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
    ],
    providers: [CompressionTaskService, UploadService, CompressionImageService]
})
export class CompressionTaskModule {
}
