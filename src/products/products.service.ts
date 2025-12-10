import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  // Get all products
  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // Create a new product
  create(productDto: CreateProductDto, user: any): Promise<Product> {
    const product = this.productRepository.create({
      ...productDto,
      user, // Assuming you want to associate a user with the product
    });

    return this.productRepository.save(product);
  }

  // Find a product by ID
  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  // Update a product
  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  // Delete a product
  async remove(id: string): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.delete(id);
  }
}