import User from '@app/entities/User';
import { getRepository } from 'typeorm';
import AppError from '@app/errors/AppError';

interface IRequest {
  id: string;
}

type IResponse = User;

class InfoUserSerivce {
  public async execute({ id }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    return user;
  }
}

export default InfoUserSerivce;
