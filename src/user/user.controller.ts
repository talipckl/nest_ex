import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
@ApiTags('users')
@Controller('users')
export class UserController {
    //constructor(private service:UserService)
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user:User) {
        return user;
    }
}
