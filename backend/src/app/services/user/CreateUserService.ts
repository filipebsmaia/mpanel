import User from '@app/entities/User';
import { getRepository } from 'typeorm';
import AppError from '@app/errors/AppError';
import { hashProvider } from '@app/providers/index';

interface IRequest {
  nickname: string;
  email: string;
  password: string;
}

type IResponse = User;

class CreateUserSerivce {
  public async execute({
    nickname,
    password,
    email,
  }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User);
    const userExists = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new AppError('Email already used');
    }

    const hashedPassowrd = await hashProvider.generateHash(password);

    const user = usersRepository.create({
      nickname,
      email,
      password: hashedPassowrd,
    });
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserSerivce;
