import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@app/errors/AppError';
import { getRepository } from 'typeorm';
import User from '@app/entities/User';
import { hashProvider } from '@app/providers';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserSerivce {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMathced = await hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMathced) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserSerivce;
