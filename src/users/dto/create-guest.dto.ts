import { IsEmail, IsNotEmpty } from 'class-validator';

export class GuestCreateDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly firstName: string; // Added field firstName

  @IsNotEmpty()
  readonly lastName: string; // Added field lastName

  readonly phoneNumber: string; // Added field phoneNumber, optional
}
