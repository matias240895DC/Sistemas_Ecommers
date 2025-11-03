import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ciudadDocumento = HydratedDocument<Ciudad>;

@Schema()
export class Ciudad {
  @Prop({ type: String })
  nombre: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provincias',
    required: true,
  })
  provincia: mongoose.Types.ObjectId;
  @Prop({ type: Boolean, default: true })
  estado: boolean;
}

export const CiudadSchema = SchemaFactory.createForClass(Ciudad);
