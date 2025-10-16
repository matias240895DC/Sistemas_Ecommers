import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type typeSystemDocument = HydratedDocument<TypeSystem>;
// eslint-disable-next-line @typescript-eslint/no-var-requires
@Schema()
export class TypeSystem {
  @Prop({ type: String })
  nombre: string;
  @Prop({ type: Boolean, default: true })
  estado: boolean;
}

export const TypeSystemSchema = SchemaFactory.createForClass(TypeSystem);
