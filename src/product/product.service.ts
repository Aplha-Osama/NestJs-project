import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    async createProduct(dto: ProductDto) {
        try {
            const product = await this.prisma.product.create({
                data: {
                    name: dto.name,
                    price: dto.price,
                    sale: dto.sale,
                    availability: 'IN_STORE'
                }
            })
            return product;
        }
        catch (error) {
            console.log(error)
        }
    }
}
