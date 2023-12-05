import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    Res,
    ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';
import { encrypt } from './utils/encrypt';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('login')
    async logIn(@Body(new ValidationPipe()) findUserDto: FindUserDto) {
        const user = await this.userService.logIn(findUserDto.email);
        const comparePassword = await bcrypt.compare(
            findUserDto.password,
            user.password,
        );
        if (comparePassword) {
            return {
                name: user.name,
                email: user.email,
                subcription: user.subscription,
            };
        }
        throw new HttpException(
            'password is not correct',
            HttpStatus.UNAUTHORIZED,
        );
    }
    @Post('register')
    async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        const hashingPassword = await encrypt(createUserDto.password);
        const editedDto = { ...createUserDto, password: hashingPassword };

        const createdUser = await this.userService.register({
            ...createUserDto,
            password: hashingPassword,
        });

        
    }
}
