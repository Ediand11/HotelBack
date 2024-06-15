import { IsNotEmpty } from 'class-validator';

export class GuestLoginDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
