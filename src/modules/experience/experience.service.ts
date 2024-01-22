import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { UserService } from '../user/user.service';
import { Model } from 'mongoose';
import { Experience, ExperienceDocument } from './schema/experience.schema';
import { InjectModel } from '@nestjs/mongoose';
import { AddressService } from '../address/address.service';

@Injectable()
export class ExperienceService {
  constructor (
    @InjectModel(Experience.name) private experienceModel: Model<ExperienceDocument>,
    private userService: UserService, 
  ) {}
  async create(createExperienceDto: CreateExperienceDto) {
    try {
      const user = this.userService.findById(createExperienceDto.user as string);
      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      } 
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

  async update(experienceId: string, updateExperienceDto: UpdateExperienceDto) {
    try {
      const experience = await this.experienceModel.findById(experienceId);
      if (!experience) {
        throw new NotFoundException('Experiência não encontrada.');
      } 
      const user = this.userService.findById(String(experience.user));
      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      } 
      return await this.experienceModel.findByIdAndUpdate(experienceId, updateExperienceDto, { new: true });
    } catch (err) {
      throw new BadRequestException(`Erro ao atualizar experiência: ${err}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.experienceModel.findByIdAndDelete(id);
    } catch (err) {
      throw new BadRequestException(`Erro ao remover experiência: ${err}`);
    }
  }
}
