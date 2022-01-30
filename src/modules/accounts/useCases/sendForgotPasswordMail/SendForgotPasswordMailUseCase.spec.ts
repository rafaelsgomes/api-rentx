import { UsersRepositoryInMemory } from '@modules/accounts/repositories/In-Memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/In-Memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send forgot mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayJsDateProvider,
      mailProviderInMemory,
    );
  });
  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');
    await usersRepositoryInMemory.create({
      driver_license: '545184350000',
      email: 'user@test.com',
      password: 'Test',
      name: 'User Test',
    });

    await sendForgotPasswordMailUseCase.execute('user@test.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send a forgot password mail to a nonexistent user', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('usr@test.com'),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('Should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create',
    );
    await usersRepositoryInMemory.create({
      driver_license: '545184350000',
      email: 'user@test.com',
      password: 'Test',
      name: 'User Test',
    });

    await sendForgotPasswordMailUseCase.execute('user@test.com');

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
