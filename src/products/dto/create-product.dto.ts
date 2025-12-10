import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  // If you also need user information, consider adding a userId field
  // @IsUUID() // If you want to enforce user UUID in the DTO
  // userId: string;
}