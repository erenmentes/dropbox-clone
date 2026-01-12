import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './dto/signin.dto';
import { SignUpDTO } from './dto/signup.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {};

    @Post('login')
    async signIn(@Body() signInDto : SignInDTO) {
        return this.authService.signIn(signInDto)
    };

    @Post('register')
    async signUp(@Body() signUpDto : SignUpDTO) {
        return this.authService.signUp(signUpDto)
    };

    @Post('refresh')
    async refresh(@Body('refresh_token') refresh_token : string) {
        return this.authService.refresh(refresh_token);
    };
}
