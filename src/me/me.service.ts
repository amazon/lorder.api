import { Injectable } from '@nestjs/common';

import { User } from '../@entities/user';
import { UpdateUserDto } from '../@entities/user/dto';
import { UserService } from '../user/user.service';

@Injectable()
export class MeService {
  constructor(private readonly userService: UserService) {}

  public update(user: User, data: UpdateUserDto): Promise<User> {
    return this.userService.update(user, data);
  }
}