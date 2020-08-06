import User from '@app/entities/User';
import { getRepository } from 'typeorm';

type IResponse = User;

class ListUserService {
  public async execute(): Promise<IResponse[]> {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();

    return users;
  }
}

export default ListUserService;
