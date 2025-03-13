import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ProductsService} from './products.service';
import {ProductDto} from './dto/product.dto';
import {CreateProductRequestDto} from './dto/create-product.request.dto';
import {FileInterceptor} from '@nestjs/platform-express';
import {UploadService} from '../utils/upload_image';
import {CompressionImageService} from '../utils/compression_image';
import {Response} from 'express'; // Import Response from express

@ApiTags('produits')
@ApiBearerAuth() // Si votre API utilise l'authentification Bearer
@Controller('produits')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly uploadService: UploadService
    ) {}

    @Post()
    @ApiOperation({ summary: 'Créer un nouveau produit' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
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
    })
    @ApiResponse({ status: 201, description: 'Le produit a été créé avec succès.' })
    @ApiResponse({ status: 500, description: 'Erreur interne du serveur.' })
    @ApiResponse({ status: 409, description: 'Conflit: le produit existe déjà.' })
    @UseInterceptors(FileInterceptor('fichier'))
    async create(
        @Body() createProductRequest: CreateProductRequestDto,
        @UploadedFile() file?: Express.Multer.File
    ) {
        const productDto: ProductDto = {
            price: createProductRequest.prix,
            title: createProductRequest.titre,
            description: createProductRequest.description,
            original_product: '',
            thumbnail_product: ''
        };

        try {
            // Check if a product with the same slug_product already exists
            const existingProduct = await this.productsService.findByTitle(createProductRequest.titre);
            if (existingProduct) {
                throw new HttpException('Un produit avec ce titre existe déjà.', HttpStatus.CONFLICT);
            }

            if (file) {
                await this.handleFileUpload(file, productDto);
            }
            return this.productsService.create(productDto);
        } catch (error) {
            if (error.status === HttpStatus.CONFLICT) {
                throw error;
            }
            throw new HttpException('Erreur lors de la création du produit', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Obtenir tous les produits' })
    @ApiResponse({ status: 200, description: 'La liste des produits.' })
    @ApiResponse({ status: 500, description: 'Erreur interne du serveur.' })
    async findAll() {
        try {
            return this.productsService.findAll();
        } catch (error) {
            throw new HttpException('Erreur lors de la récupération des produits', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtenir un produit par ID' })
    @ApiResponse({ status: 200, description: 'Les détails du produit.' })
    @ApiResponse({ status: 404, description: 'Produit non trouvé.' })
    async findOne(@Param('id') id: string) {
        try {
            return this.productsService.findOne(id);
        } catch (error) {
            throw new HttpException('Produit non trouvé', HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    @ApiOperation({ summary: 'Mettre à jour un produit par ID' })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: 200, description: 'Le produit a été mis à jour avec succès.' })
    @ApiResponse({ status: 500, description: 'Erreur interne du serveur.' })
    @UseInterceptors(FileInterceptor('fichier'))
    async update(
        @Param('id') id: string,
        @Body() createProductRequest: CreateProductRequestDto,
        @UploadedFile() file?: Express.Multer.File
    ) {
        const productDto: ProductDto = {
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
        } catch (error) {
            throw new HttpException('Erreur lors de la mise à jour du produit', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Supprimer un produit par ID' })
    @ApiResponse({ status: 200, description: 'Le produit a été supprimé avec succès.' })
    @ApiResponse({ status: 500, description: 'Erreur interne du serveur.' })
    async remove(@Param('id') id: string) {
        try {
            return this.productsService.remove(id);
        } catch (error) {
            throw new HttpException('Erreur lors de la suppression du produit', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async handleFileUpload(file: Express.Multer.File, productDto: ProductDto) {
        try {
            //const compressedFilename = await this.compressionImageService.compressImage(file.buffer);
            productDto.original_product = this.uploadService.saveFile(file);
        } catch (error) {
            throw new HttpException('Erreur lors du traitement du téléchargement de fichier', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Voir images
    @Get(':id/image')
    @ApiOperation({ summary: 'Obtenir une image de produit par ID' })
    @ApiResponse({
        status: 200, description: "L'image du produit."
    })
    @ApiResponse({ status: 404, description: 'Produit non trouvé.' })
    async findImage(@Param('id') id: string) {
        try {
            return this.productsService.findImage(id);
        } catch (error) {
            throw new HttpException('Produit non trouvé', HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id/preview')
    @ApiOperation({ summary: 'Obtenir une image de produit par ID' })
    @ApiResponse({ status: 200, description: "L'image du produit." })
    @ApiResponse({ status: 404, description: 'Produit non rencontré.' })
    async previewImage(@Param('id') id: string, @Res() res: Response) {
        try {
            const imageBuffer = await this.productsService.previewImage(id);
            res.set({
                'Content-Type': 'image/jpeg',
                'Content-Disposition': 'inline',
                'Content-Length': imageBuffer.length,
            });
            res.end(imageBuffer);
        } catch (error) {
            throw new HttpException('Produit non rencontré', HttpStatus.NOT_FOUND);
        }
    }

    @Get(':id/original-preview')
    @ApiOperation({ summary: 'Obtenir un aperçu de l\'image originale du produit par ID' })
    @ApiResponse({ status: 200, description: "L'aperçu de l'image originale du produit." })
    @ApiResponse({ status: 404, description: 'Produit non rencontré.' })
    async originalPreviewImage(@Param('id') id: string, @Res() res: Response) {
        try {
            const imageBuffer = await this.productsService.originalPreviewImage(id);
            res.set({
                'Content-Type': 'image/jpeg',
                'Content-Disposition': 'inline',
                'Content-Length': imageBuffer.length,
            });
            res.end(imageBuffer);
        } catch (error) {
            throw new HttpException('Produit non rencontré', HttpStatus.NOT_FOUND);
        }
    }

    @Get(':filename')
    async getFile(@Param('filename') filename: string, @Res() res: Response) {
        try {
            const fileBuffer = this.uploadService.readFile(filename);
            res.set({
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment; filename=${filename}`,
                'Content-Length': fileBuffer.length,
            });
            res.end(fileBuffer);
        } catch (error) {
            res.status(404).send('File not found');
        }
    }
}
