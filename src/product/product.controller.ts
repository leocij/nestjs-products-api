import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { Product } from './interface/product.interface';

@Controller('/api/v1/products')
export class ProductController {

    constructor(
        private productService: ProductService,
    ) {}

    @Post()
    async createPost(@Res() res, @Body() productDto: ProductDto): Promise<Product> {
        return res.status(HttpStatus.CREATED).json({
            message: 'Product Successfully Created',
            product: await this.productService.postProduct(productDto),
        });
    }

    // Usando o @Query pode se fazer a busca pelo Atributo do Objeto. Exemplo: products?id=123456
    @Get()
    async getProducts(@Res() res, @Query('id') id): Promise<Product[]> {
        if (id) {
            const product = await this.productService.getProductById(id);
            if (product) {
                return res.status(HttpStatus.OK).json( { product } );
            } else {
                throw new NotFoundException('Product does not found!');
            }
        } else {
            return res.status(HttpStatus.OK).json( await this.productService.getProducts() );
        }
    }

    @Get('/:id')
    async getProductById(@Res() res, @Param('id') id: string): Promise<Product> {
        const product = await this.productService.getProductById(id);
        if (product) {
            return res.status(HttpStatus.OK).json( { product } );
        } else {
            throw new NotFoundException('Product does not found!');
        }
    }

    @Delete('/:id')
    async deleteProductById(@Res() res, @Param('id') id: string): Promise<Product> {
        const productDeleted = await this.productService.deleteProductById(id);
        if (productDeleted) {
            return res.status(HttpStatus.OK).json( { message: 'Product deleted successfuly!'} );
        } else {
            throw new NotFoundException('Product does not found!');
        }
    }

    @Put('/:id')
    async updateProduct(@Res() res, @Param('id') id: string, @Body() productDto: ProductDto): Promise<Product> {
        const productUpdated = await this.productService.putProduct(id, productDto);
        if (productUpdated) {
            return res.status(HttpStatus.OK).json( { message: 'Product updated successfuly!'}, productUpdated );
        } else {
                throw new NotFoundException('Product does not found!');
        }
    }
}
