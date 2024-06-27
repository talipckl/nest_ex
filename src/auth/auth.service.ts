import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as  argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async signup(dto: AuthDto) {
        const password = await argon.hash(dto.password)
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password
                },
            });
            delete user.password

            return user;
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === "P2002") {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw err;
        }
    }

    async signin(authDto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: authDto.email
            }
        })
        if (!user) throw new ForbiddenException('Credentials incorrect')
        const mathcesPass = await argon.verify(user.password, authDto.password);
        if (!mathcesPass) throw new ForbiddenException('Credentials incorrect')
        delete user.password;

        const tokenData = await this.signToken(user.id, user.email);

        return {
            ...tokenData,
            user_id: user.id,
            email: user.email,
            name: user.name
        };
    }
    async signToken(user_id: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: user_id,
            email
        }
        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '45m',
                //secret: process.env.JWT_SECRET || 'default_secret'
                secret: this.config.get('JWT_SECRET')
            }
        );

        return {
            access_token: token,
        };
    }
    
}
