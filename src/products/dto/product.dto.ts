import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
 title: string;

 description: string;

 price: number;

 original_product?: string;

 thumbnail_product?: string;
}
