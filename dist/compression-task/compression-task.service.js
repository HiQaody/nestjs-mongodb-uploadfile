"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const product_schema_1 = require("../products/schemas/product.schema");
const compression_image_1 = require("../utils/compression_image");
const upload_image_1 = require("../utils/upload_image");
const fs = __importStar(require("node:fs"));
let CompressionTaskService = CompressionTaskService_1 = class CompressionTaskService {
    constructor(productModel, compressionImageService, uploadService) {
        this.productModel = productModel;
        this.compressionImageService = compressionImageService;
        this.uploadService = uploadService;
        this.logger = new common_1.Logger(CompressionTaskService_1.name);
        this.isCompressionTaskRunning = false;
    }
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
                    product.thumbail_product = await this.compressionImageService.compressImage(fs.readFileSync(originalFilePath));
                    await product.save();
                    const endTime = Date.now();
                    const elapsedTime = endTime - startTime;
                    this.logger.log(`Compressed image for product ID: ${product._id} in ${elapsedTime} ms`);
                }
                catch (error) {
                    this.logger.error(`Error compressing image for product ID: ${product._id}`, error.stack);
                }
            }
        }
        finally {
            this.isCompressionTaskRunning = false;
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
        compression_image_1.CompressionImageService,
        upload_image_1.UploadService])
], CompressionTaskService);
//# sourceMappingURL=compression-task.service.js.map