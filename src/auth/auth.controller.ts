import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto)
    }
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }
}
