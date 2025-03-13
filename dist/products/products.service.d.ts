import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { ProductDto } from './dto/product.dto';
import { UploadService } from "../utils/upload_image";
export declare class ProductsService {
    private productModel;
    private readonly uploadService;
    constructor(productModel: Model<Product>, uploadService: UploadService);
    create(productDto: ProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, productDto: ProductDto): Promise<Product>;
    remove(id: string): Promise<Product>;
    findByTitle(titre: string): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findImage(id: string): Promise<string>;
    previewImage(id: string): Promise<Buffer>;
    originalPreviewImage(id: string): Promise<Buffer>;
}
