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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var CompressionImageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompressionImageService = void 0;
const common_1 = require("@nestjs/common");
const sharp_1 = __importDefault(require("sharp"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const uuid_1 = require("uuid");
const config_1 = require("@nestjs/config");
let CompressionImageService = CompressionImageService_1 = class CompressionImageService {
    constructor(configService) {
        this.configService = configService;
        this.qualities = {
            high: 90,
            medium: 70,
            low: 50,
        };
        this.logger = new common_1.Logger(CompressionImageService_1.name);
        this.maxSizeInBytes = 200 * 1024;
        this.storagePath = path.join(process.cwd(), 'public', 'compressed');
        this.ensureStoragePathExists();
    }
    ensureStoragePathExists() {
        if (!fs.existsSync(this.storagePath)) {
            fs.mkdirSync(this.storagePath, { recursive: true });
        }
    }
    async compressImage(buffer, quality = 'high', maxWidth = 1920) {
        this.logger.log(`Compressing image with quality ${quality}...`);
        let compressedBuffer = await (0, sharp_1.default)(buffer)
            .resize({
            width: maxWidth,
            height: undefined,
            fit: 'inside',
            withoutEnlargement: true,
        })
            .jpeg({ quality: this.qualities[quality] })
            .toBuffer();
        if (compressedBuffer.length > this.maxSizeInBytes) {
            compressedBuffer = await (0, sharp_1.default)(buffer)
                .resize({
                width: maxWidth,
                height: undefined,
                fit: 'inside',
                withoutEnlargement: true,
            })
                .jpeg({ quality: this.qualities['medium'] })
                .toBuffer();
        }
        if (compressedBuffer.length > this.maxSizeInBytes) {
            compressedBuffer = await (0, sharp_1.default)(buffer)
                .resize({
                width: maxWidth,
                height: undefined,
                fit: 'inside',
                withoutEnlargement: true,
            })
                .jpeg({ quality: this.qualities['low'] })
                .toBuffer();
        }
        const uniqueFilename = `${Date.now()}_${(0, uuid_1.v4)()}.jpg`;
        const filePath = path.join(this.storagePath, uniqueFilename);
        fs.writeFileSync(filePath, compressedBuffer);
        return uniqueFilename;
    }
};
exports.CompressionImageService = CompressionImageService;
exports.CompressionImageService = CompressionImageService = CompressionImageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CompressionImageService);
//# sourceMappingURL=compression_image.js.map