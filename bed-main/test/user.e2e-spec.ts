import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { setupApp } from '../src/setup-app';
import { CreateUserWithEmailDto } from '../src/user/dto/create-user-with-email.dto';
import { Roles } from '../src/shared/types';
import { promisify } from 'util';
import { exec } from 'child_process';
import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { FirebaseAdmin } from '../src/config/firebase.config';
import { CreateUserWithPhoneDto } from '../src/user/dto/create-user-with-phone.dto';
const env = dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });
const execute = promisify(exec);

async function getIdToken(uid: string, firebase: admin.app.App) {
  const customToken = await firebase.auth().createCustomToken(uid);

  // Here we're using the custom token to convert it to a Firebase ID token.
  const token = await axios({
    method: 'post',
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${env.parsed.FIREBASE_API_KEY}`,
    data: {
      token: customToken,
      returnSecureToken: true,
    },
  });

  return token.data.idToken;
}

describe('User Module (e2e)', () => {
  let app: INestApplication;
  let firebase: admin.app.App = null;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();

    if (!firebase) {
      firebase = new FirebaseAdmin().setup();
    }
  });

  beforeAll(async () => {
    await execute('npm run firebase:drop:test');
    await execute('npm run schema:drop:test');
    await execute('npm run schema:create:test');
    await execute('npm run typeorm:test migration:run');
  });

  afterEach((done) => {
    app.close();
    done();
  });

  it('create user with email', () => {
    const createUserRequest: CreateUserWithEmailDto = {
      email: 'test@test.com',
      firstName: 'Foo',
      lastName: 'Bar',
    };

    return request(app.getHttpServer())
      .post('/api/user/signup-email')
      .send(createUserRequest)
      .expect(201)
      .then((res) => {
        const {
          uid,
          firstName,
          lastName,
          role,
          email,
          displayName,
          emailVerified,
          customToken,
        } = res.body;

        expect(uid).toBeDefined();
        expect(firstName).toBeDefined();
        expect(lastName).toBeDefined();
        expect(role).toBeDefined();
        expect(email).toBeDefined();
        expect(displayName).toBeDefined();
        expect(emailVerified).toBeDefined();
        expect(customToken).toBeDefined();

        expect(firstName).toEqual(createUserRequest.firstName);
        expect(lastName).toEqual(createUserRequest.lastName);
        expect(role).toEqual(Roles.USER_DEFAULT);
        expect(email).toEqual(createUserRequest.email);
        expect(emailVerified).toEqual(false);
      });
  });

  it('create user with phone', async () => {
    try {
      const userRecord = await firebase.auth().createUser({
        phoneNumber: '+61411111111',
      });
      const createUserRequest: CreateUserWithPhoneDto = {
        firstName: 'Foo',
        lastName: 'Bar',
      };

      const accessToken = await getIdToken(userRecord.uid, firebase);

      return request(app.getHttpServer())
        .post('/api/user/signup-phone')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(createUserRequest)
        .expect(201)
        .then((res) => {
          const {
            uid,
            firstName,
            lastName,
            role,
            phoneNumber,
            displayName,
            emailVerified,
          } = res.body;
          expect(uid).toBeDefined();
          expect(firstName).toBeDefined();
          expect(lastName).toBeDefined();
          expect(role).toBeDefined();
          expect(phoneNumber).toBeDefined();
          expect(displayName).toBeDefined();
          expect(emailVerified).toBeDefined();
          expect(firstName).toEqual(createUserRequest.firstName);
          expect(lastName).toEqual(createUserRequest.lastName);
          expect(role).toEqual(Roles.USER_DEFAULT);
          expect(emailVerified).toEqual(false);
        });
    } catch (error) {
      console.log('Error creating new user:', error);
    }
  });

  it('create user with provider', async () => {
    try {
      const userRecord = await firebase.auth().createUser({
        email: 'test@provider.com',
        emailVerified: true,
        displayName: 'Foo Bar',
      });

      const [firstName, lastName] = userRecord.displayName.split(' ');

      const accessToken = await getIdToken(userRecord.uid, firebase);

      return request(app.getHttpServer())
        .post('/api/user/signup-with-provider')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(201)
        .then((res) => {
          const { uid, role, email, displayName, emailVerified } = res.body;

          expect(uid).toBeDefined();
          expect(firstName).toBeDefined();
          expect(lastName).toBeDefined();
          expect(role).toBeDefined();
          expect(email).toBeDefined();
          expect(displayName).toBeDefined();
          expect(emailVerified).toBeDefined();

          expect(firstName).toEqual(firstName);
          expect(lastName).toEqual(lastName);
          expect(role).toEqual(Roles.USER_DEFAULT);
          expect(email).toEqual(userRecord.email);
          expect(emailVerified).toEqual(true);
        });
    } catch (error) {
      console.log('Error creating new user:', error);
    }
  });

  it('sign in user with email', async () => {
    try {
      return request(app.getHttpServer())
        .post('/api/user/signin-email')
        .send({
          email: 'test@test.com',
        })
        .expect(200);
    } catch (error) {
      console.log('Error signin user with email:', error);
    }
  });
});
