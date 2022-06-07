import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { FirebaseAdmin } from '../config/firebase.config';
import { FirebaseUserRecord, Roles } from '../shared/types';
import { UserEntity } from './user.entity';
import { CreateUserEmailPasswordDto } from './dto/create-user-email-password.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly firebase: FirebaseAdmin,
  ) {}

  async createUserEmailAndPassword(
    createUserRequest: CreateUserEmailPasswordDto,
  ): Promise<FirebaseUserRecord> {
    try {
      const { email, password, firstName, lastName } = createUserRequest;
      const role = Roles.USER_DEFAULT;
      const firebase = this.firebase.setup();

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

      const savedUser = (await firebase
        .auth()
        .getUser(createdUser.uid)) as FirebaseUserRecord;

      return savedUser;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }
  async createUserWithProvider(
    currentUser: FirebaseUserRecord,
  ): Promise<FirebaseUserRecord> {
    try {
      const { uid, email, displayName } = currentUser;
      const [firstName, lastName] = displayName.split(' ');
      const role = Roles.USER_DEFAULT;
      const firebase = this.firebase.setup();

      await firebase
        .auth()
        .setCustomUserClaims(uid, { firstName, lastName, role });

      const userToSave = this.userRepository.create({
        id: uid,
        email,
        firstName,
        lastName,
        role,
      });

      await this.userRepository.save(userToSave);

      const updatedUser = (await firebase
        .auth()
        .getUser(uid)) as FirebaseUserRecord;

      return updatedUser;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error creating user!');
    }
  }

  async sendVerificationLink(user: FirebaseUserRecord): Promise<string> {
    try {
      const firebase = this.firebase.setup();
      const { email } = user;

      const verificationLink = await firebase
        .auth()
        .generateEmailVerificationLink(email, {
          url: process.env.FRONTEND_URL,
        });

      return verificationLink;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error sending verification link!');
    }
  }
}
