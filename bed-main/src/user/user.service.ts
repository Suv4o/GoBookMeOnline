import { BadRequestException, Injectable } from '@nestjs/common';
import { FirebaseAdmin } from '../config/firebase.config';
import { FirebaseUserRecord } from '../shared/types';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly firebase: FirebaseAdmin) {}

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
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
