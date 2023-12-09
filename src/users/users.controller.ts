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
import * as bcrypt from 'bcrypt';
import { encrypt } from './utils/encrypt';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    // check email endpoint
    @Post('check-email-existence')
    async chekcEmail(@Body() email:string){
        // check if email exists in database
        const emailExistence = this.userService.checkEmailExists(email)

        if(emailExistence){
            // return acception http response if email is not used
            throw new HttpException('email is not used before',HttpStatus.ACCEPTED)
        }
        
        throw new HttpException('email is used before', HttpStatus.CONFLICT)

    }

    // login in endpoint
    @Post('login')
    async logIn(@Body(new ValidationPipe()) findUserDto: FindUserDto) {
        // get the user from database if exists
        const user = await this.userService.logIn(findUserDto.email);
        // compare the encrypted password in database with the the password in post request body
        
        const comparePassword = await bcrypt.compare(
            findUserDto.password,
            user.password,
        );

        // reutrn user info If the password is correct
        if (comparePassword) {
            return {
                name: user.name,
                email: user.email,
                subcription: user.subscription,
            };
        }
        // Error when password is not correct
        throw new HttpException(
            'Password is not correct',
            HttpStatus.UNAUTHORIZED,
        );
    }


    // regiseter endpoint
    @Post('register')
    async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {


        // hashing the password
        const hashedPassword = await encrypt(createUserDto.password);

        // pass the hashed password to the database
        const createdUser = await this.userService.register({
            ...createUserDto,
            password: hashedPassword,
        });
        return createdUser;
    }
}
