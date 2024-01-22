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

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
