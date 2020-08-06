import User from '@app/entities/User';
import AppError from '@app/errors/AppError';
import { getRepository } from 'typeorm';
import { hashProvider } from '../../providers/index';

interface IRequest {
  user_id: string;
  nickname: string;
  email: string;
  old_password: string;
  password: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    nickname,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('user not found');
    }

    const userWithUpdatedEmail = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('Email already in use.');
    }

    user.nickname = nickname;
    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }
    }

    if (password) {
      user.password = await hashProvider.generateHash(password);
    }
    return usersRepository.save(user);
  }
}

export default UpdateProfileService;
