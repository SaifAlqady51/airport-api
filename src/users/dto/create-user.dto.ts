import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}
