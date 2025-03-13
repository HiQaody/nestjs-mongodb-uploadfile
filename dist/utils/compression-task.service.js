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
var CompressionTaskService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressionTaskService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const compression_image_1 = require("./compression_image");
const product_schema_1 = require("../products/schemas/product.schema");
let CompressionTaskService = CompressionTaskService_1 = class CompressionTaskService {
    constructor(productModel, compressionImageService) {
        this.productModel = productModel;
        this.compressionImageService = compressionImageService;
        this.logger = new common_1.Logger(CompressionTaskService_1.name);
    }
    async handleCron() {
        this.logger.debug('Checking for products to compress...');
        const products = await this.productModel.find({ thumbnail_product: '' }).exec();
        for (const product of products) {
            try {
                product.thumbail_product = await this.compressionImageService.compressImage(product.original_product);
                await product.save();
                this.logger.log(`Compressed image for product ID: ${product._id}`);
            }
            catch (error) {
                this.logger.error(`Error compressing image for product ID: ${product._id}`, error.stack);
            }
        }
    }
};
exports.CompressionTaskService = CompressionTaskService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompressionTaskService.prototype, "handleCron", null);
exports.CompressionTaskService = CompressionTaskService = CompressionTaskService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        compression_image_1.CompressionImageService])
], CompressionTaskService);
//# sourceMappingURL=compression-task.service.js.map