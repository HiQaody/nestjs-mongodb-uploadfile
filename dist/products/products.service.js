"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./schemas/product.schema");
const upload_image_1 = require("../utils/upload_image");
let ProductsService = class ProductsService {
    constructor(productModel, uploadService) {
        this.productModel = productModel;
        this.uploadService = uploadService;
    }
    async create(productDto) {
        const newProduct = new this.productModel();
        newProduct.title_product = productDto.title;
        newProduct.description_product = productDto.description;
        newProduct.price_product = productDto.price;
        newProduct.slug_product = productDto.title.split(' ').join('-').toLowerCase();
        newProduct.original_product = productDto.original_product;
        newProduct.thumbail_product = productDto.thumbnail_product;
        return newProduct.save();
    }
    async findAll() {
        return this.productModel.find().exec();
    }
    async findOne(id) {
        return this.productModel.findById(id).exec();
    }
    async update(id, productDto) {
        return this.productModel.findByIdAndUpdate(id, productDto, { new: true }).exec();
    }
    async remove(id) {
        return this.productModel.findByIdAndDelete(id).exec();
    }
    async findByTitle(titre) {
        return this.productModel.findOne({ title_product: titre }).exec();
    }
    async findImage(id) {
        const product = await this.productModel.findById(id).exec();
        const image = product.thumbail_product;
        return this.uploadService.generatePreview(image);
    }
    async previewImage(id) {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new Error('Produit non rencontré');
        }
        const previewFilename = await this.uploadService.generatePreview(product.thumbail_product);
        return this.uploadService.readFile(previewFilename);
    }
    async originalPreviewImage(id) {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new Error('Produit non rencontré');
        }
        const previewFilename = await this.uploadService.generateOriginalPreview(product.original_product);
        return this.uploadService.readFile(previewFilename);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        upload_image_1.UploadService])
], ProductsService);
//# sourceMappingURL=products.service.js.map