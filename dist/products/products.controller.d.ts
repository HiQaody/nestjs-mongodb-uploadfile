import { ProductsService } from './products.service';
import { CreateProductRequestDto } from './dto/create-product.request.dto';
import { UploadService } from '../utils/upload_image';
import { Response } from 'express';
export declare class ProductsController {
    private readonly productsService;
    private readonly uploadService;
    constructor(productsService: ProductsService, uploadService: UploadService);
    create(createProductRequest: CreateProductRequestDto, file?: Express.Multer.File): Promise<import("./schemas/product.schema").Product>;
    findAll(): Promise<import("./schemas/product.schema").Product[]>;
    findOne(id: string): Promise<import("./schemas/product.schema").Product>;
    update(id: string, createProductRequest: CreateProductRequestDto, file?: Express.Multer.File): Promise<import("./schemas/product.schema").Product>;
    remove(id: string): Promise<import("./schemas/product.schema").Product>;
    private handleFileUpload;
    findImage(id: string): Promise<string>;
    previewImage(id: string, res: Response): Promise<void>;
    originalPreviewImage(id: string, res: Response): Promise<void>;
    getFile(filename: string, res: Response): Promise<void>;
}
