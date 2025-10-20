import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  PipeTransform,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform<string, string> {
  transform(value: string) {
    console.log(value);
    if (value == '{id}')
      throw new ConflictException('Seleccione un registro a desactivar ');
    if (!value) throw new ConflictException('id requerido');
    if (!/^[a-f\d]{24}$/i.test(value)) {
      throw new ConflictException('id inválido (debe ser ObjectId de 24 hex)');
    }
    return value;
  }
}

@Injectable()
export class CleanIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (req.params?.id === '{id}') {
      req.params.id = undefined; // o lanza una excepción aquí si prefieres
    }

    return next.handle();
  }
}
