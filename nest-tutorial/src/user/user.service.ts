import { Injectable, HttpStatus } from '@nestjs/common';
import {
  ExceptionBody,
  hashPassword,
  SearchUserByUsername,
  SearchUserByEmail,
} from 'src/user/utils';
import { CreateUserDTO } from 'src/user/Validations';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UserInterface } from 'src/interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}

  async getUserById(id: string): Promise<object> {
    try {
      let User = await this.UserModel.findById(id);
      if (!User) throw new Error('User not found');
      let data = User.toJSON();
      delete data.password;
      return data;
    } catch (error) {
      throw new ExceptionBody(error.message, HttpStatus.NOT_FOUND);
    }
  }
  async getUserByEmail(email: string): Promise<object> {
    try {
      let User = await SearchUserByEmail(this.UserModel, email);
      if (!User) throw new Error('User not found');
      let data = User.toJSON();
      delete data.password;
      return data;
    } catch (error) {
      return null;
    }
  }
  async getUserByUsername(username: string): Promise<UserInterface> {
    try {
      let User = await SearchUserByUsername(this.UserModel, username);
      if (!User) throw new Error('User not found');
      let data = User.toJSON();
      return data;
    } catch (error) {
      return null;
    }
  }

  async createUser(body: CreateUserDTO): Promise<Omit<User, 'password'>> {
    try {
      const userByEmail = await this.getUserByEmail(body.email);
      if (userByEmail) {
        throw new Error('The user already exists in the database');
      }

      const userByUsername = await this.getUserByUsername(body.username);
      if (userByUsername) {
        throw new Error('The user already exists in the database');
      }

      body.password = await hashPassword(body.password);
      const createdUser = new this.UserModel(body);
      let UserData = await createdUser.save();
      let data = UserData.toJSON();
      delete data.password;
      return data;
    } catch (error) {
      throw new ExceptionBody(
        'Ocurrio un error al crear el usuario, intenta nuevamente',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUserById(id: string) {
    try {
      let data = await this.UserModel.findByIdAndDelete(id);
      if (!data) throw new Error('User not found');
      return {
        message: 'The user has been deleted',
      };
    } catch (error) {
      throw new ExceptionBody(error.message, HttpStatus.NOT_FOUND);
    }
  }
  async deleteUserByEmail(email: string) {
    try {
      let data = await this.UserModel.findOneAndDelete({ email });
      if (!data) throw new Error('User not found');
      return {
        message: 'The user has been deleted',
      };
    } catch (error) {
      throw new ExceptionBody(error.message, HttpStatus.NOT_FOUND);
    }
  }
  async deleteUserByUsername(username: string) {
    try {
      let data = await this.UserModel.findOneAndDelete({ username });
      if (!data) throw new Error('User not found');
      return {
        message: 'The user has been deleted',
      };
    } catch (error) {
      throw new ExceptionBody(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
