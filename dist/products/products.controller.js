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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("./products.service");
const create_product_request_dto_1 = require("./dto/create-product.request.dto");
const platform_express_1 = require("@nestjs/platform-express");
const upload_image_1 = require("../utils/upload_image");
let ProductsController = class ProductsController {
    constructor(productsService, uploadService) {
        this.productsService = productsService;
        this.uploadService = uploadService;
    }
    async create(createProductRequest, file) {
        const productDto = {
            price: createProductRequest.prix,
            title: createProductRequest.titre,
            description: createProductRequest.description,
            original_product: '',
            thumbnail_product: ''
        };
        try {
            const existingProduct = await this.productsService.findByTitle(createProductRequest.titre);
            if (existingProduct) {
                throw new common_1.HttpException('Un produit avec ce titre existe déjà.', common_1.HttpStatus.CONFLICT);
            }
            if (file) {
                await this.handleFileUpload(file, productDto);
            }
            return this.productsService.create(productDto);
        }
        catch (error) {
            if (error.status === common_1.HttpStatus.CONFLICT) {
                throw error;
            }
            throw new common_1.HttpException('Erreur lors de la création du produit', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            return this.productsService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la récupération des produits', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            return this.productsService.findOne(id);
        }
        catch (error) {
            throw new common_1.HttpException('Produit non trouvé', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async update(id, createProductRequest, file) {
        const productDto = {
            price: createProductRequest.prix,
            title: createProductRequest.titre,
            description: createProductRequest.description,
            original_product: '',
            thumbnail_product: ''
        };
        try {
            if (file) {
                await this.handleFileUpload(file, productDto);
            }
            return this.productsService.update(id, productDto);
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la mise à jour du produit', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            return this.productsService.remove(id);
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors de la suppression du produit', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async handleFileUpload(file, productDto) {
        try {
            productDto.original_product = this.uploadService.saveFile(file);
        }
        catch (error) {
            throw new common_1.HttpException('Erreur lors du traitement du téléchargement de fichier', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findImage(id) {
        try {
            return this.productsService.findImage(id);
        }
        catch (error) {
            throw new common_1.HttpException('Produit non trouvé', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async previewImage(id, res) {
        try {
            const imageBuffer = await this.productsService.previewImage(id);
            res.set({
                'Content-Type': 'image/jpeg',
                'Content-Disposition': 'inline',
                'Content-Length': imageBuffer.length,
            });
            res.end(imageBuffer);
        }
        catch (error) {
            throw new common_1.HttpException('Produit non rencontré', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async originalPreviewImage(id, res) {
        try {
            const imageBuffer = await this.productsService.originalPreviewImage(id);
            res.set({
                'Content-Type': 'image/jpeg',
                'Content-Disposition': 'inline',
                'Content-Length': imageBuffer.length,
            });
            res.end(imageBuffer);
        }
        catch (error) {
            throw new common_1.HttpException('Produit non rencontré', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getFile(filename, res) {
        try {
            const fileBuffer = this.uploadService.readFile(filename);
            res.set({
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment; filename=${filename}`,
                'Content-Length': fileBuffer.length,
            });
            res.end(fileBuffer);
        }
        catch (error) {
            res.status(404).send('File not found');
        }
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau produit' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Données du produit et fichier',
        required: true,
        schema: {
            type: 'object',
            properties: {
                titre: { type: 'string', example: 'Produit Exemple', uniqueItems: true },
                description: { type: 'string', example: 'Ceci est une description de produit exemple.' },
                prix: { type: 'number', example: 99.99 },
                fichier: {
                    type: 'file',
                    format: 'binary',
                },
            },
            required: ['titre', 'description', 'prix', 'fichier'],
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Le produit a été créé avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erreur interne du serveur.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflit: le produit existe déjà.' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('fichier')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_request_dto_1.CreateProductRequestDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir tous les produits' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'La liste des produits.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erreur interne du serveur.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir un produit par ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Les détails du produit.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produit non trouvé.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un produit par ID' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Le produit a été mis à jour avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erreur interne du serveur.' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('fichier')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_product_request_dto_1.CreateProductRequestDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un produit par ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Le produit a été supprimé avec succès.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Erreur interne du serveur.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/image'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir une image de produit par ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: "L'image du produit."
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produit non trouvé.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findImage", null);
__decorate([
    (0, common_1.Get)(':id/preview'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir une image de produit par ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "L'image du produit." }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produit non rencontré.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "previewImage", null);
__decorate([
    (0, common_1.Get)(':id/original-preview'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir un aperçu de l\'image originale du produit par ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "L'aperçu de l'image originale du produit." }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produit non rencontré.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "originalPreviewImage", null);
__decorate([
    (0, common_1.Get)(':filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getFile", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('produits'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('produits'),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        upload_image_1.UploadService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map