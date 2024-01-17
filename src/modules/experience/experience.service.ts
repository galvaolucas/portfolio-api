import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { UserService } from '../user/user.service';
import { Model } from 'mongoose';
import { Experience, ExperienceDocument } from './schema/experience.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExperienceService {
  constructor (
    @InjectModel(Experience.name) private experienceModel: Model<ExperienceDocument>,
    private userService: UserService, 
  ) {}
  async create(createExperienceDto: CreateExperienceDto, userId: string) {
    try {
      const user = this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      } 
      createExperienceDto.user = userId;
      const createdExperience = new this.experienceModel(createExperienceDto);
      return await createdExperience.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  async findByUserId(userId: string) {
    try {
      const user = this.userService.findById(userId);
      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      } 
      return await this.experienceModel.find({ user: userId });
    } catch (err) {
      throw new Error(err);
    }
  }

  findAll() {
    return `This action returns all experience`;
  }

  findOne(id: number) {
    return `This action returns a #${id} experience`;
  }

  update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return `This action updates a #${id} experience`;
  }

  remove(id: number) {
    return `This action removes a #${id} experience`;
  }
}
