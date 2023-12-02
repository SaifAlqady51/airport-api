import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';

export class FindUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
