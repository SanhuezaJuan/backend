import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ROLES } from '../../auth/enums/Role.enum';
//definicion de las propiedades del schema

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true, trim: true, unique: true })
  username: string;

  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop({ required: true, trim: true, unique: true })
  password: string;

  @Prop({ required: true, default: ROLES.VISITOR })
  role: ROLES;
}

//creacion del schema
export const UserSchema = SchemaFactory.createForClass(User);
