import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExperienceModule } from './modules/experience/experience.module';
import { JwtModule } from '@nestjs/jwt';
import { AddressModule } from './modules/address/address.module';
import { PersonalDataModule } from './modules/personal-data/personal-data.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [
    MailModule,
    UserModule,
    AuthModule,
    ExperienceModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGOOSE_URL),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    PersonalDataModule,
    AddressModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
