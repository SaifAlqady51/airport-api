import {
    Args,
    Mutation,
    Resolver,
  } from '@nestjs/graphql';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { FindUserDto } from './dto/find-user.dto';
  import * as bcrypt from 'bcrypt';
  import { encrypt } from './utils/encrypt';
  import { CheckEmailDto } from './dto/chekEmail-user.dto';
  import sendMail from './utils/sendMail';
  import { getRandomNumber } from './utils/generateRandom';
  import { User } from './models/user.model';
  
  @Resolver('User')
  export class UsersResolver {
    constructor(private readonly userService: UsersService) {}
  
    @Mutation(() => User)
    async logIn(@Args('findUserInput') findUserInput: FindUserDto) {
      const user = await this.userService.logIn(findUserInput.email);
  
      const comparePassword = await bcrypt.compare(
        findUserInput.password,
        user.password,
      );
  
      if (comparePassword) {
        return {
          name: user.name,
          email: user.email,
          subscription: user.subscription,
        };
      }
      throw new Error('Password is not correct');
    }
  
    @Mutation(() => User)
    async register(@Args('createUserInput') createUserInput: CreateUserDto) {
      const hashedPassword = await encrypt(createUserInput.password);
  
      const createdUser = await this.userService.register({
        ...createUserInput,
        password: hashedPassword,
      });
      return createdUser;
    }
  
    @Mutation(() => Boolean)
    async checkEmail(@Args('checkEmailInput') checkEmailInput: CheckEmailDto) {
      const emailExistence = await this.userService.checkEmailExists(checkEmailInput.email);
  
      if (emailExistence) {
        throw new Error('email is used before');
      }
      return true;
    }
  
    @Mutation(() => String)
    async sendEmail(@Args('checkEmailInput') checkEmailInput: CheckEmailDto) {
      const randomNumber = getRandomNumber();
      const encryptNumber = await encrypt(randomNumber.toString());
      await sendMail(checkEmailInput.email, randomNumber);
  
      return encryptNumber;
    }
  }