import { Model } from 'mongoose';
import { CompressionImageService } from './compression_image';
import { Product } from "../products/schemas/product.schema";
export declare class CompressionTaskService {
    private productModel;
    private readonly compressionImageService;
    private readonly logger;
    constructor(productModel: Model<Product>, compressionImageService: CompressionImageService);
    handleCron(): Promise<void>;
}
