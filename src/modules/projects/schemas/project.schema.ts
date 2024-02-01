import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { Address } from "src/modules/address/schema/address.schema";
import { User } from "src/modules/user/schema/user.schema";
import { CreateProjectDto } from "../dto/create-project.dto";

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project implements CreateProjectDto {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true })
  user: string | User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  link: string;

  @Prop()
  images?: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

