import { Body, Get, Injectable, Post } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Login } from './login.dto';

@Injectable()
export class LoginService {
    constructor() {}

    checkLogin(message: Login): any{
        Logger.log(message);
        if (message.username === 'admin' && message.password === 'admin') {
            return { message: 'Login successful' };
        }
        return { message: 'Login failed' };
    }

}
