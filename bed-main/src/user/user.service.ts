import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { FirebaseAdmin } from '../config/firebase.config';
import { FirebaseUserRecord, Roles } from '../shared/types';
import { UserEntity } from './user.entity';
import { CreateUserWithEmailDto } from './dto/create-user-with-email.dto';
import { MailService } from '../mail/mail.service';
import { CreateUserWithPhoneDto } from './dto/create-user-with-phone.dto';
import { SignInUserWithEmailDto } from './dto/signin-user-with-email.dto';
import { SignInUserWithPhoneDto } from './dto/signin-user-with-phone.dto';

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
    existingUser: UserEntity,
  ): Promise<FirebaseUserRecord & { customToken: string }> {
    try {
      const { email, firstName, lastName } = createUserRequest;
      const role = Roles.USER_DEFAULT;
      const firebase = this.firebase.setup();

      const createdUser = (await firebase.auth().createUser({
        email,
        displayName: `${firstName} ${lastName}`,
      })) as FirebaseUserRecord;

      const dbObj = {
        firebaseIds: [createdUser.uid],
        email,
        firstName,
        lastName,
        role,
      } as Partial<UserEntity>;

      if (existingUser) {
        dbObj.id = existingUser.id;
        dbObj.firebaseIds = [...existingUser.firebaseIds, createdUser.uid];
      }

      const userToSave = this.userRepository.create(dbObj);
      const dbUser = await this.userRepository.save(userToSave);

      await firebase.auth().setCustomUserClaims(createdUser.uid, {
        internalId: dbUser.id,
        firstName,
        lastName,
        role,
      });

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
    existingUser: UserEntity,
  ): Promise<FirebaseUserRecord> {
    try {
      const { uid, phoneNumber } = currentUser;
      const { firstName, lastName } = createUserRequest;

      const role = Roles.USER_DEFAULT;
      const firebase = this.firebase.setup();

      if (existingUser && existingUser.firebaseIds.includes(uid)) {
        const firebaseUser = (await firebase
          .auth()
          .getUser(currentUser.uid)) as FirebaseUserRecord;

        return firebaseUser;
      }

      const updatedUser = (await firebase.auth().updateUser(uid, {
        displayName: `${firstName} ${lastName}`,
      })) as FirebaseUserRecord;

      const dbObj = {
        firebaseIds: [updatedUser.uid],
        phoneNumber,
        firstName,
        lastName,
        role,
      } as Partial<UserEntity>;

      if (existingUser) {
        dbObj.id = existingUser.id;
        dbObj.firebaseIds = [...existingUser.firebaseIds, updatedUser.uid];
      }

      const userToSave = this.userRepository.create(dbObj);
      const dbUser = await this.userRepository.save(userToSave);

      await firebase.auth().setCustomUserClaims(updatedUser.uid, {
        internalId: dbUser.id,
        firstName,
        lastName,
        role,
      });

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
    existingUser: UserEntity,
  ): Promise<FirebaseUserRecord> {
    try {
      const { uid, email, displayName } = currentUser;
      const [firstName, lastName] = displayName.split(' ');
      const role = Roles.USER_DEFAULT;
      const firebase = this.firebase.setup();

      if (existingUser && existingUser.firebaseIds.includes(uid)) {
        const firebaseUser = (await firebase
          .auth()
          .getUser(currentUser.uid)) as FirebaseUserRecord;

        return firebaseUser;
      }

      const dbObj = {
        firebaseIds: [currentUser.uid],
        email,
        firstName,
        lastName,
        role,
      } as Partial<UserEntity>;

      if (existingUser) {
        dbObj.id = existingUser.id;
        dbObj.firebaseIds = [...existingUser.firebaseIds, currentUser.uid];
      }

      const userToSave = this.userRepository.create(dbObj);
      const dbUser = await this.userRepository.save(userToSave);

      await firebase.auth().setCustomUserClaims(uid, {
        internalId: dbUser.id,
        firstName,
        lastName,
        role,
      });

      const updatedUser = (await firebase
        .auth()
        .getUser(uid)) as FirebaseUserRecord;

      return updatedUser;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async signInUserWithEmail(signInUserRequest: SignInUserWithEmailDto) {
    try {
      const firebase = this.firebase.setup();
      const { email } = signInUserRequest;

      const userDatabase = await this.userRepository.findOne({
        where: { email },
      });

      const userFirebase = (await firebase
        .auth()
        .getUserByEmail(email)) as FirebaseUserRecord;

      if (!userDatabase || !userFirebase) {
        throw new NotFoundException('User not found!');
      }

      const signInLink = await firebase
        .auth()
        .generateSignInWithEmailLink(email, {
          url: process.env.FRONTEND_URL + '/?user=' + email,
        });
      await this.mailService.signInEmail(userFirebase, signInLink);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async signInUserWithPhone(
    signInUserRequest: SignInUserWithPhoneDto,
  ): Promise<FirebaseUserRecord> {
    try {
      const firebase = this.firebase.setup();
      const { phoneNumber } = signInUserRequest;

      const userDatabase = await this.userRepository.findOne({
        where: { phoneNumber },
      });

      const userFirebase = (await firebase
        .auth()
        .getUserByPhoneNumber(phoneNumber)) as FirebaseUserRecord;

      if (!userDatabase || !userFirebase) {
        throw new NotFoundException('User not found!');
      }

      return userFirebase;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
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
          url: process.env.FRONTEND_URL + '/?successfully-signed=true',
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
