import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type typeSystemDocument = HydratedDocument<TipoDocumento>;
@Schema()
export class TipoDocumento {
  @Prop({ type: String })
  nombre: string;
  @Prop({ type: Boolean, default: true })
  estado: boolean;
}

export const tipoDocumentoSchema = SchemaFactory.createForClass(TipoDocumento);
