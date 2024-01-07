import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
    userService: UserService;
  }

  async signIn(username: string, password: string): Promise<string> {
    const user = await this.userService.findOne({ username });
    const decodedPassword = await bcrypt.compare(user?.password, password);
    if (!decodedPassword) {
      throw new UnauthorizedException();
    }
    const token = jwt.sign(
      { user },
      process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
      { expiresIn: '24h', algorithm: 'RS256' },
    );
    return token;
  }
}
