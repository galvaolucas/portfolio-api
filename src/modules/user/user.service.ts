import { MailService } from './../mail/mail.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
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
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltRounds,
      );
      const user = {
        ...createUserDto,
        password: hashedPassword,
      };
      const createdUser = new this.userModel(user);
      // await this.mailService.sendUserConfirmation(createdUser);
      return createdUser.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(params: Record<string, any>) {
    const user = await this.userModel.findOne({ params });
    return user;
  }

  findById(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
