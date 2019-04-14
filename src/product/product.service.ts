import { Injectable } from '@nestjs/common';
import { Product } from './interface/product.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) {}

    async getProducts(): Promise<Product[]> {
        return await this.productModel.find();
    }

    async getProductById(id: string): Promise<Product> {
        return await this.productModel.findById(id);
    }

    async postProduct(productDto: ProductDto): Promise<Product> {
        return await new this.productModel(productDto).save();
    }

    async deleteProductById(id: string): Promise<Product> {
        return await this.productModel.findByIdAndDelete(id);
    }

    async putProduct(id: string, productDto: ProductDto): Promise<Product> {
        // new: true devolve o objeto atualizado.
        return await this.productModel.findByIdAndUpdate(id, productDto, { new: true });
    }
}
