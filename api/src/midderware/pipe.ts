import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform<string, string> {
  transform(value: string) {
    if (!value) throw new ConflictException('id requerido');
    if (!/^[a-f\d]{24}$/i.test(value)) {
      throw new ConflictException('id inválido (debe ser ObjectId de 24 hex)');
    }
    return value;
  }
}
