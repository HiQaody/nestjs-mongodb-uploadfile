import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
    @Prop({ required: true })
    title_product: string;

    @Prop({ required: true, unique: true })
    slug_product: string;

    @Prop()
    description_product: string;

    @Prop()
    thumbail_product: string;

    @Prop()
    original_product: string;

    @Prop({ required: true })
    price_product: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);