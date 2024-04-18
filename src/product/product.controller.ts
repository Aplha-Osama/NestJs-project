import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto';

@Controller('product')
export class ProductController {
    constructor(private productServices: ProductService) {}

    @Post('create')
    create( @Body() dto:ProductDto){
        return this.productServices.createProduct(dto)
    }

}
