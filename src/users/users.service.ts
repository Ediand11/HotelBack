import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { AdminCreateDto } from './dto/create-admin.dto';
import { GuestCreateDto } from './dto/create-guest.dto';
import { AdminLoginDto } from './dto/login-admin.dto';
import { GuestLoginDto } from './dto/login-guest.dto';
import { AdministratorEntity } from './entities/administrator.entity';
import { GuestEntity } from './entities/guest.entity';
import { UserEntity } from './entities/user.entity';
import { UserResponseType } from './types/userResponse.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AdministratorEntity)
    private adminRepository: Repository<AdministratorEntity>,
    @InjectRepository(GuestEntity)
    private guestRepository: Repository<GuestEntity>,
  ) {}

  async createAdmin(adminCreateDto: AdminCreateDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      where: { email: adminCreateDto.email },
    });

    if (existingUser) {
      throw new HttpException(
        'Email is already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = this.userRepository.create({
      ...adminCreateDto,
      role: 'admin',
    });
    const user = await this.userRepository.save(newUser);

    const newAdmin = this.adminRepository.create({
      id: newUser.id,
      name: adminCreateDto.name,
      user: user,
    });

    await this.adminRepository.save(newAdmin);
    return newUser;
  }

  async loginAdmin(adminLoginDto: AdminLoginDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { username: adminLoginDto.username },
      select: ['id', 'username', 'password', 'role', 'email'],
    });

    if (!user || user.role !== 'admin') {
      throw new HttpException(
        'Admin not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(
      adminLoginDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Incorrect password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }

  async createGuest(guestCreateDto: GuestCreateDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      where: { email: guestCreateDto.email },
    });

    if (existingUser) {
      throw new HttpException(
        'Email is already taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = this.userRepository.create({
      ...guestCreateDto,
      role: 'guest',
    });
    const user = await this.userRepository.save(newUser);
    const newGuest = this.guestRepository.create({
      id: newUser.id,
      firstName: guestCreateDto.firstName,
      lastName: guestCreateDto.lastName,
      phoneNumber: guestCreateDto.phoneNumber,
      user: user,
    });
    await this.guestRepository.save(newGuest);
    return newUser;
  }

  async loginGuest(guestLoginDto: GuestLoginDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { username: guestLoginDto.username },
      select: ['id', 'username', 'password', 'role', 'email'],
    });

    if (!user || user.role !== 'guest') {
      throw new HttpException(
        'Guest not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(
      guestLoginDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Incorrect password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }

  buildUserResponse(userEntity: UserEntity): UserResponseType {
    return {
      username: userEntity.username,
      email: userEntity.email,
    };
  }

  generateJwt(userEntity: UserEntity): string {
    return sign({ email: userEntity.email }, 'JWT_SECRET');
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }
}
