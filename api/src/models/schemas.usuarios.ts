import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UsuariosDocumento = HydratedDocument<Usuarios>;

@Schema()
export class Usuarios {
  @Prop({ type: String })
  nombre: string;
  @Prop({ type: String })
  usuario: string;
  @Prop({ type: String })
  pass: string;
  @Prop({ type: String })
  apellido: string;
  @Prop({ type: String })
  email: string;
  @Prop({ type: String })
  codigoArea: string;
  @Prop({ type: String })
  telefono: string;
  @Prop({ type: String })
  numeroDocumento: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TipoDocumento',
    required: true,
  })
  tipoDocumento: mongoose.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rol',
    required: true,
  })
  rol: mongoose.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ciudad',
    required: true,
  })
  ciudad: mongoose.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provincias',
    required: true,
  })
  provincias: mongoose.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pais',
    required: true,
  })
  pais: mongoose.Types.ObjectId;

  @Prop({ type: Boolean, default: true })
  estado: boolean;
}

export const UsuariosSchema = SchemaFactory.createForClass(Usuarios);
