import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type typeSystemDocument = HydratedDocument<Provincias>;

@Schema()
export class Provincias {
  @Prop({ type: String })
  nombre: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pais',
    required: true,
  })
  pais: mongoose.Types.ObjectId;
  @Prop({ type: Boolean, default: true })
  estado: boolean;
}

export const provinciasSchemaDocument =
  SchemaFactory.createForClass(Provincias);
