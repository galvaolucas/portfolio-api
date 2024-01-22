import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { PersonalDataService } from './personal-data.service';
import { CreatePersonalDataDto } from './dto/create-personal-data.dto';
import { UpdatePersonalDataDto } from './dto/update-personal-data.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('personalData')
export class PersonalDataController {
  constructor(private readonly personalDataService: PersonalDataService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPersonalDataDto: CreatePersonalDataDto) {
    return this.personalDataService.create(createPersonalDataDto);
  }

  @Get()
  findAll() {
    return this.personalDataService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalDataService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePersonalDataDto: UpdatePersonalDataDto) {
    return this.personalDataService.update(id, updatePersonalDataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalDataService.remove(+id);
  }
}
