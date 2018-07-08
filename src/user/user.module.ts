import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from '../mail/mail.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from '../@orm/user';
import { RoleRepository } from '../@orm/role';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, RoleRepository]), MailModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
