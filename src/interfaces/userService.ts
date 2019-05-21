import { InterfaceUser } from './user'
export interface interfaceUserService{
    firstStep(data:InterfaceUser):Promise<InterfaceUser>;
    lastStep(password:string,phone_number:string):Promise<any>;
    log(phone:string,token:string,status:string):Promise<boolean>;
}