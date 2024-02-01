import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createExperienceDto: CreateExperienceDto) {
    return this.experienceService.create(createExperienceDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.experienceService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experienceService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Get('user/:id')
  findByUserId(@Param('id') id: string) {
    return this.experienceService.findByUserId(id);
  }

  @UseGuards(AuthGuard)
  @Put(':experienceId')
  update(
    @Param('experienceId') experienceId: string,
    @Body() updateExperienceDto: UpdateExperienceDto) {
    return this.experienceService.update(experienceId, updateExperienceDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experienceService.remove(id);
  }
}
