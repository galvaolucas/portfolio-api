import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Address, AddressDocument } from './schema/address.schema';
import { Model } from 'mongoose';

@Injectable()
export class AddressService {
  constructor (
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    const createAddress = new this.addressModel(createAddressDto);
    return await createAddress.save();
  }

  findAll() {
    return `This action returns all address`;
  }

  async findOne(id: string) {
    return await this.addressModel.findById(id);
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }

  updateAddressMapper = async (data: UpdateAddressDto) => {
    const address = await this.addressModel.findById(data._id);
    if (!address) {
      throw new Error('Endereço não encontrado');
    }
    if (data.addOn) {
      address.addOn = data.addOn;
    }
    if (data.city) {
      address.city = data.city;
    }
    if (data.state) {
      address.state = data.state;
    }
    if (data.city) {
      address.city = data.city;
    }
    if (data.number) {
      address.number = data.number;
    }
    if (data.cep) {
      address.cep = data.cep;
    }
    return await this.addressModel.updateOne({ _id: data._id }, data);
  }
}
