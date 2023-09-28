import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Login } from './login.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}
    @Post()
        @UsePipes(new ValidationPipe())
        async checkLogin(@Body() message: Login): Promise<any> {
            return this.loginService.checkLogin(message);
        }
    
    
}
