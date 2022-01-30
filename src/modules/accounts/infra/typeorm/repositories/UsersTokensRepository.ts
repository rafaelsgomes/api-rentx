import { getRepository, Repository } from 'typeorm';

import { ICreateUsersTokenDTO } from '@modules/accounts/dtos/ICreateUsersTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { UserTokens } from '../entities/UserTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }
  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUsersTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const tokens = await this.repository.findOne({ user_id, refresh_token });
    return tokens;
  }

  async deleteById(token_id: string): Promise<void> {
    await this.repository.delete(token_id);
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const tokens = await this.repository.findOne({ refresh_token });
    return tokens;
  }
}

export { UsersTokensRepository };
