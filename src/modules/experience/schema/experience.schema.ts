import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CreateExperienceDto } from '../dto/create-experience.dto';
import { User } from 'src/modules/user/schema/user.schema';

export type ExperienceDocument = HydratedDocument<Experience>;

@Schema()
export class Experience implements CreateExperienceDto {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true, type: Date })
  startDate: string;

  @Prop({ type: Date })
  endDate?: string;

  @Prop({ required: true })
  attributions: string;

  @Prop({ required: true })
  technologies: string[];

  @Prop({ default: false })
  currentJob?: boolean;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
