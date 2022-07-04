import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';

let searchUserBy: 'email' | 'phoneNumber' = null;

export function GetExistingUser(searchBy: 'email' | 'phoneNumber') {
  searchUserBy = searchBy;
  return UseInterceptors(ExistingUser);
}

@Injectable()
class ExistingUser implements NestInterceptor {
  private readonly searchBy: 'email' | 'phoneNumber';
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.searchBy = searchUserBy;
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const findObj: Pick<Partial<UserEntity>, 'email' | 'phoneNumber'> = {};

    if (this.searchBy === 'email') {
      findObj.email = request.body.email;
    }

    if (this.searchBy === 'phoneNumber') {
      findObj.phoneNumber = request.body.phoneNumber;
    }

    const user = await this.userRepository.findOne({
      where: { ...findObj },
    });

    request.existingUser = user ? user : null;

    return next.handle();
  }
}
