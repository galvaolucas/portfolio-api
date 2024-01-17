import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { IAuthUser } from 'src/global/types';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
    userService: UserService;
  }

  async signIn(email: string, password: string): Promise<IAuthUser> {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException('Email não encontrado.');
    }
    const decodedPassword = await bcrypt.compare(password, user?.password);
    if (!decodedPassword) {
      throw new UnauthorizedException();
    }
    delete user.password
    const token = jwt.sign(
      { user },
      process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
      { expiresIn: '24h', algorithm: 'RS256' },
    );
    return { id: user._id, email: user.email, username: user.username, token, role: user.role };
  }
}
