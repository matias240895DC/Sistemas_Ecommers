import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type paisesDocumento = HydratedDocument<Pais>;

@Schema()
export class Pais {
  @Prop({ type: String })
  nombre: string;
  @Prop({ type: String })
  moneda: string;
  @Prop({ type: Boolean, default: true })
  estado: boolean;
}

export const PaisSchema = SchemaFactory.createForClass(Pais);
