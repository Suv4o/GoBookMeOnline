import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { setupApp } from '../src/setup-app';
import { CreateUserWithEmailDto } from 'src/user/dto/create-user-with-email.dto';
import { Roles } from '../src/shared/types';
import { promisify } from 'util';
import { exec } from 'child_process';
const execute = promisify(exec);

describe('User Module (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  beforeAll(async () => {
    await execute('npm run firebase:drop:test');
    await execute('npm run schema:drop:test');
    await execute('npm run schema:create:test');
    await execute('npm run typeorm:test migration:run');
  });

  afterAll((done) => {
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
});
