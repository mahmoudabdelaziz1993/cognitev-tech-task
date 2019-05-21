import { Document, Schema, Model, model } from 'mongoose'
import { InterfaceUser } from '../interfaces/user';


const userSchema: Schema = new Schema({
    first_name:{type:String},
    last_name:{type:String},
    country_code:{type:String},
    phone_number:{type:String,required:true},
    gender:{type:String},
    birthdate:{type:String},
    avatar:{type:String},
    email:{type:String},
    status:{type:String},
    password:{type:String}
}, { timestamps: true });


export const User: Model<InterfaceUser> = model<InterfaceUser>('users', userSchema);