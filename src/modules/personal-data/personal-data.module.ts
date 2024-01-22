import { Module } from '@nestjs/common';
import { PersonalDataService } from './personal-data.service';
import { PersonalDataController } from './personal-data.controller';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalData, PersonalDataSchema } from './schema/personal-data.schema';
import { AddressModule } from '../address/address.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  
  controllers: [PersonalDataController],
  providers: [PersonalDataService],
  imports: [
    MongooseModule.forFeature([{ name: PersonalData.name, schema: PersonalDataSchema }]),
    AddressModule,
    UserModule,
    AuthModule,
  ],
})
export class PersonalDataModule {}
