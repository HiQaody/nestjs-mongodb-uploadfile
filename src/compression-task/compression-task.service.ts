import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../products/schemas/product.schema';
import { CompressionImageService } from '../utils/compression_image';
import { UploadService } from '../utils/upload_image';
import * as fs from 'node:fs';

@Injectable()
export class CompressionTaskService {
    private readonly logger = new Logger(CompressionTaskService.name);
    private isCompressionTaskRunning = false;

    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        private readonly compressionImageService: CompressionImageService,
        private readonly uploadService: UploadService
    ) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        if (this.isCompressionTaskRunning) {
            this.logger.debug('Compression task is already running. Skipping this execution.');
            return;
        }

        this.isCompressionTaskRunning = true;
        this.logger.debug('Checking for products to compress...');

        try {
            const products = await this.productModel.find({ thumbail_product: '' }).exec();
            this.logger.debug(`Found ${products.length} products to compress.`);

            for (const product of products) {
                try {
                    const originalFilePath = this.uploadService.getFilePath(product.original_product);
                    if (!fs.existsSync(originalFilePath)) {
                        this.logger.error(`Original file not found for product ID: ${product._id}`);
                        continue;
                    }

                    this.logger.debug(`Compressing image for product ID: ${product._id}...`);
                    const startTime = Date.now();

                    product.thumbail_product = await this.compressionImageService.compressImage(
                        fs.readFileSync(originalFilePath)
                    );
                    await product.save();

                    const endTime = Date.now();
                    const elapsedTime = endTime - startTime;
                    this.logger.log(`Compressed image for product ID: ${product._id} in ${elapsedTime} ms`);
                } catch (error) {
                    this.logger.error(`Error compressing image for product ID: ${product._id}`, error.stack);
                }
            }
        } finally {
            this.isCompressionTaskRunning = false;
        }
    }
}
