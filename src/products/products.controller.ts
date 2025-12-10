import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Get all products
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // Create a new product
  @Post()
  async create(@Body() createProductDto: CreateProductDto ): Promise<Product> {
      const user = {
      id: 1,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    };
    return this.productService.create(createProductDto , user );
  }

  

  // Get a product by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  // Update a product by ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  // Delete a product by ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }
}