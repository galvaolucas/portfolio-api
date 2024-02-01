import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonalDataDto } from './dto/create-personal-data.dto';
import { UpdatePersonalDataDto } from './dto/update-personal-data.dto';
import { PersonalData, PersonalDataDocument } from './schema/personal-data.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { AddressService } from '../address/address.service';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { UpdateAddressDto } from '../address/dto/update-address.dto';
import { Address } from '../address/schema/address.schema';

@Injectable()
export class PersonalDataService {
  constructor (
    @InjectModel(PersonalData.name) private personalDataModel: Model<PersonalDataDocument>,
    private addressService: AddressService,
    private userService: UserService, 
  ) {}
  async create(createPersonalDataDto: CreatePersonalDataDto) {
    try {
      const user = await this.userService.findById(createPersonalDataDto.user as string);
      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }
      if (createPersonalDataDto.address) {
        const address = await this.addressService.create(createPersonalDataDto.address as CreateAddressDto);
        createPersonalDataDto.address = String(address._id);
      }
      const personalData = new this.personalDataModel(createPersonalDataDto);
      return await personalData.save();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  findAll() {
    return `This action returns all personalData`;
  }

  async findOne(id: string) {
    if (id) {
      const user = await this.userService.findById(id);
      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }
      const personalData = await this.personalDataModel.findOne({
        user: id,
      }).exec();
      if (!personalData) {
        return {};
      }
      const address = await this.addressService.findOne(personalData.address as string);
      personalData.address = address; 
      return personalData;
    }
  }

  async update(id: string, updatePersonalDataDto: UpdatePersonalDataDto) {
    const user = await this.userService.findById(updatePersonalDataDto.user as string);
      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }
      const personalData = await this.personalDataModel.findById(id).exec();
      if (!personalData) {
        throw new NotFoundException('Dados pessoais não encontrados');
      }
      if (updatePersonalDataDto.address) {
        await this.addressService.updateAddressMapper(updatePersonalDataDto.address as UpdateAddressDto);
      }
      return await personalData.updateOne(personalData.id, updatePersonalDataDto).exec();
    } catch (err) {
      throw new BadRequestException(err);
    }

  remove(id: number) {
    return `This action removes a #${id} personalData`;
  }
}
