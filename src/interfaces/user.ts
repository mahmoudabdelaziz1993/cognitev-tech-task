import {Document} from 'mongoose'
export interface InterfaceUser extends Document {
    first_name?:string|any;
    last_name?:string|any;
    country_code?:string|any;
    phone_number:string|any;
    gender?:string|any;
    birthdate?:string|any;
    avatar:string;
    email?:string|any;
    status?:string|any;
    password?:string|any;
}