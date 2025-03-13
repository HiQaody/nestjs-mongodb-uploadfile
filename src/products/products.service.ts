import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Product} from './schemas/product.schema';
import {ProductDto} from './dto/product.dto';
import {UploadService} from "../utils/upload_image";

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>,
                private readonly uploadService: UploadService) {
    }

    async create(productDto: ProductDto): Promise<Product> {
        const newProduct = new this.productModel();
        newProduct.title_product = productDto.title;
        newProduct.description_product = productDto.description;
        newProduct.price_product = productDto.price;
        newProduct.slug_product = productDto.title.split(' ').join('-').toLowerCase();
        newProduct.original_product = productDto.original_product;
        newProduct.thumbail_product = productDto.thumbnail_product;

        return newProduct.save();
    }


    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findOne(id: string): Promise<Product> {
        return this.productModel.findById(id).exec();
    }

    async update(id: string, productDto: ProductDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, productDto, {new: true}).exec();
    }

    async remove(id: string): Promise<Product> {
        return this.productModel.findByIdAndDelete(id).exec();
    }

    async findByTitle(titre: string) {
        return this.productModel.findOne({title_product: titre}).exec();
    }

    async findImage(id: string) {
        const product = await this.productModel.findById(id).exec();
        const image = product.thumbail_product;
        return this.uploadService.generatePreview(image);
    }

    async previewImage(id: string): Promise<Buffer> {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new Error('Produit non rencontré');
        }
        const previewFilename = await this.uploadService.generatePreview(product.thumbail_product);
        return this.uploadService.readFile(previewFilename);
    }

    async originalPreviewImage(id: string): Promise<Buffer> {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new Error('Produit non rencontré');
        }
        const previewFilename = await this.uploadService.generateOriginalPreview(product.original_product);
        return this.uploadService.readFile(previewFilename);
    }
}
