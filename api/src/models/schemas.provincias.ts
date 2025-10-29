import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProvinciaDocumento = HydratedDocument<Provincia>;

@Schema()
export class Provincia {
  @Prop({ type: String })
  nombre: string;
  @Prop({ type: String })
  pais: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'Pais';
    required: true;
  };
  @Prop({ type: Boolean, default: true })
  estado: boolean;
}

export const ProvinciaSchema = SchemaFactory.createForClass(Provincia);
