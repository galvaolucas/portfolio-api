import { ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {
    userService: UserService;
    jwtService: JwtService;
  }

  async signIn(email: string, password: string): Promise<{access_token: string}> {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException('Email não encontrado.');
    }
    const decodedPassword = await bcrypt.compare(password, user?.password);
    if (!decodedPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username, role: user.role, email: user.email }
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.JWT_PRIVATE_KEY, algorithm: 'RS256', expiresIn: '1d' }),
    };
  }

  async status(req: Request): Promise<{status: boolean}> {
    const token = this.extractTokenFromHeader(req);
    try {
      const validate = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_PRIVATE_KEY });
      if (validate) {
        return { status: true };
      }
      return { status: false }
    } catch (err) {
      return { status: false }
    }
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = (request.headers as { authorization?: string }).authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
