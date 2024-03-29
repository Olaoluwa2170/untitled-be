import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthLoginDto, AuthSignUpDto } from './dto';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

    async signup(dto: AuthSignUpDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                username: dto.username
            }
        })
        
        if(user) throw new HttpException("User Already Exists!", HttpStatus.CONFLICT)

        const hashedPassword = await hash(dto.password, 10)
        
        const newUser = await this.prismaService.user.create({
            data: {
                username: dto.username,
                password: hashedPassword,
                email: dto.email,
                role: dto.role
            }
        })
        
        const access_token = this.jwtService.sign(newUser, {
            expiresIn: '2d',
            secret: "access-token-secret",
        })
        
        return access_token
    }

    async login(dto: AuthLoginDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                username: dto.username
            }
        })
        
        if(!user) throw new HttpException("User Unauthorized", HttpStatus.UNAUTHORIZED)

        const isPasswordCorrect = await compare(dto.password, user.password)
        
        if(!isPasswordCorrect) throw new HttpException("User Unauthorized", HttpStatus.UNAUTHORIZED)
        
        const access_token = this.jwtService.sign(user, {
            expiresIn: '2d',
            secret: "access-token-secret",
        })
        
        return access_token
    }

    logout() {
        return ["benji"]
    }
}
