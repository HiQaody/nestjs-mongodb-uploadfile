import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequestDto {
    @ApiProperty({ description: 'Le titre du produit' })
    titre: string;

    @ApiProperty({ description: 'La description du produit' })
    description: string;

    @ApiProperty({ description: 'Le prix du produit' })
    prix: number;
}
