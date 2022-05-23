import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FirebaseAdmin } from '../config/firebase.config';
import { FirebaseUserRecord } from '../shared/types';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly firebase: FirebaseAdmin,
  ) {}

  async createUser(
    createUserRequest: CreateUserDto,
  ): Promise<FirebaseUserRecord> {
    const { email, password, firstName, lastName, role } = createUserRequest;
    const firebase = this.firebase.setup();

    try {
      const createdUser = (await firebase.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
      })) as FirebaseUserRecord;

      await firebase
        .auth()
        .setCustomUserClaims(createdUser.uid, { firstName, lastName, role });

      const userToSave = this.userRepository.create({
        id: createdUser.uid,
        email,
        firstName,
        lastName,
        role,
      });

      await this.userRepository.save(userToSave);

      return createdUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
