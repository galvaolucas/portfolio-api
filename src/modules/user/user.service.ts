import { MailService } from './../mail/mail.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email: createUserDto.email });
      if (user) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltRounds,
      );
      const newUser = {
        ...createUserDto,
        password: hashedPassword,
      };
      const createdUser = new this.userModel(newUser);
      // await this.mailService.sendUserConfirmation(createdUser);
      return await createdUser.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(params: Record<string, any>) {
    return await this.userModel.findOne(params);
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
