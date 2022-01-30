import { ICreateUsersTokenDTO } from '@modules/accounts/dtos/ICreateUsersTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  userTokens: UserTokens[] = [];
  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUsersTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token,
    });
    this.userTokens.push(userToken);

    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const tokens = this.userTokens.find(
      token =>
        token.user_id === user_id && token.refresh_token === refresh_token,
    );
    return tokens;
  }
  async deleteById(token_id: string): Promise<void> {
    const userToken = this.userTokens.find(token => token.id === token_id);
    this.userTokens.splice(this.userTokens.indexOf(userToken));
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const tokens = this.userTokens.find(
      token => token.refresh_token === refresh_token,
    );
    return tokens;
  }
}

export { UsersTokensRepositoryInMemory };
