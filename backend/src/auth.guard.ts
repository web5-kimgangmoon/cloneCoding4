import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

const validateRequest = (request: any) => {
  // real
  if (typeof request.session.session_id === 'number') return true;
  else throw new UnauthorizedException('로그인이 필요합니다');
  // test
  //   if(request.query.id===undefined) throw new UnauthorizedException("비로그인 상태입니다")
  //   return request.query.id === '1';
};

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}

const validateRequest_reverse = (request: any) => {
  if (typeof request.session.session_id === 'number')
    throw new UnauthorizedException('이미 로그인 상태입니다.');
  else return true;
};

@Injectable()
export class AuthGuard_reverse implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest_reverse(request);
  }
}
