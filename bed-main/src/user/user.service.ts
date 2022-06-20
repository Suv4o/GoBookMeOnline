import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { FirebaseAdmin } from '../config/firebase.config';
import { FirebaseUserRecord, Roles } from '../shared/types';
import { UserEntity } from './user.entity';
import { CreateUserWithEmailDto } from './dto/create-user-with-email.dto';
import { MailService } from '../mail/mail.service';
import { CreateUserWithPhoneDto } from './dto/create-user-with-phone.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly firebase: FirebaseAdmin,
    private mailService: MailService,
  ) {}

  async createUserWithEmail(
    createUserRequest: CreateUserWithEmailDto,
  ): Promise<FirebaseUserRecord & { customToken: string }> {
    try {
      const { email, firstName, lastName } = createUserRequest;
      const role = Roles.USER_DEFAULT;
      const firebase = this.firebase.setup();

      const createdUser = (await firebase.auth().createUser({
        email,
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
        .getUser(createdUser.uid)) as FirebaseUserRecord & {
        customToken: string;
      };

      savedUser.customToken = await this.generateCustomToken(savedUser);

      return savedUser;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async createUserWithPhone(
    createUserRequest: CreateUserWithPhoneDto,
    currentUser: FirebaseUserRecord,
  ): Promise<FirebaseUserRecord> {
    try {
      const { uid, phoneNumber } = currentUser;
      const { firstName, lastName } = createUserRequest;

      const role = Roles.USER_DEFAULT;
      const firebase = this.firebase.setup();

      const updatedUser = (await firebase.auth().updateUser(uid, {
        displayName: `${firstName} ${lastName}`,
      })) as FirebaseUserRecord;

      await firebase
        .auth()
        .setCustomUserClaims(updatedUser.uid, { firstName, lastName, role });

      const userToSave = this.userRepository.create({
        id: updatedUser.uid,
        phoneNumber,
        firstName,
        lastName,
        role,
      });

      await this.userRepository.save(userToSave);

      const savedUser = (await firebase
        .auth()
        .getUser(updatedUser.uid)) as FirebaseUserRecord;

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

  async sendVerificationLink(user: FirebaseUserRecord): Promise<void> {
    try {
      const firebase = this.firebase.setup();
      const { email, emailVerified } = user;

      if (emailVerified) {
        throw new NotAcceptableException('User already verified!');
      }

      const verificationLink = await firebase
        .auth()
        .generateEmailVerificationLink(email, {
          url: process.env.FRONTEND_URL + '/?successfully-created=true',
        });
      await this.mailService.verificationEmail(user, verificationLink);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error sending verification link!');
    }
  }

  private async generateCustomToken(user: FirebaseUserRecord): Promise<string> {
    try {
      const firebase = this.firebase.setup();
      const { uid } = user;
      const role = Roles.USER_DEFAULT;
      const customToken = await firebase
        .auth()
        .createCustomToken(uid, { role });
      return customToken;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }
}
