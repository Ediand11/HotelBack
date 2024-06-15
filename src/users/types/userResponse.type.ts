import { UserEntity } from '../entities/user.entity';

export type UserResponseType = Pick<UserEntity, 'username' | 'email'>;
