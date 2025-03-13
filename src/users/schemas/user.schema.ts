import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'strongpassword',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    description: 'The telephone number of the user',
    example: '+123456789',
  })
  @Prop({ required: true })
  telephone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
