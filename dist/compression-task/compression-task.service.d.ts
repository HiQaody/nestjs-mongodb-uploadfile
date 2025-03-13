import { Model } from 'mongoose';
import { Product } from '../products/schemas/product.schema';
import { CompressionImageService } from '../utils/compression_image';
import { UploadService } from '../utils/upload_image';
export declare class CompressionTaskService {
    private productModel;
    private readonly compressionImageService;
    private readonly uploadService;
    private readonly logger;
    private isCompressionTaskRunning;
    constructor(productModel: Model<Product>, compressionImageService: CompressionImageService, uploadService: UploadService);
    handleCron(): Promise<void>;
}
