import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type typeSystemDocument = HydratedDocument<Rol>;
// eslint-disable-next-line @typescript-eslint/no-var-requires
@Schema()
export class Rol {
  @Prop({ type: String })
  nombre: string;
  @Prop({ type: Boolean, default: true })
  estado: boolean;
}

export const rolSchema = SchemaFactory.createForClass(Rol);
