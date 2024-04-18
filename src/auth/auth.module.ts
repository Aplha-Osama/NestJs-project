import { Module } from "@nestjs/common";
import { AuthService } from "./auth.services";
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";


@Module({
    imports:[JwtModule.register({})],
    controllers:[AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}

 

