import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { Experience, ExperienceSchema } from './schema/experience.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Experience.name, schema: ExperienceSchema }]),
    UserModule
  ],
  controllers: [ExperienceController],
  providers: [ExperienceService],
  exports: [ExperienceService],
})
export class ExperienceModule {}
