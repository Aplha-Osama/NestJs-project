import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { Console } from "console";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()

export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async signup(dto: AuthDto) {
        try {

            // hash user password
            const hash = await argon.hash(dto.password)

            // save user in DB
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hash

                }
            })

            delete user.hash

            //  return user on front end
            return { status: 'success', statusCode: '1', message: 'User signup Successfully', user }
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError)
                if (error.code == 'P2002') throw new ForbiddenException('Credientails Taken')
            throw error;
        }
    }

    async signin(dto: AuthDto) {
        // find user by email

        const userExists = await this.prisma.user.findUnique({
            where: { email: dto.email }
        })

        // if user doesnot exists throw exception
        if (!userExists) throw new ForbiddenException('Credientials incorrect');

        // compare password
        const pwMatches = await argon.verify(userExists.hash, dto.password)

        // if password incorrect throw exception
        if (!pwMatches) throw new ForbiddenException('Credientials incorrect');

        //  return user data

        return this.signToken(userExists.id, userExists.email)

    }

    async signToken(
        userId: number,
        email: string
    ): Promise < {access_token : string }> {

        const payload = {
            sub: userId, 
            email
        };

        const secret = this.config.get('JWT_SECRET')


        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '15m',
                secret: secret
            })

        return {
            access_token: token
    }
}

}