import { InterfaceUser } from '../interfaces/user';
import { interfaceUserService } from '../interfaces/userService';
import { User } from '../models/User';
import { Types } from 'mongoose';
import * as jwt from 'jsonwebtoken';

export const UserService: interfaceUserService = {
    async firstStep(data) {
        try {
            let existUser = await User.findOne({ phone_number: data.phone_number });
            if (existUser) {
                return existUser;
            } else {
                let user = await User.create(data);
                return user;
            }
        } catch (error) {
            throw error
        }
    },
    async lastStep(password, phone_number) {
        try {
            let existUser = await User.findOne({ phone_number: phone_number });
            if (existUser) {
                if (existUser.password) {
                    if (existUser.password == password) {
                        const token: string = await jwt.sign({ phone_number: existUser.phone_number }, process.env.SECRET, {
                            expiresIn: '60m'
                        });
                        return token;
                    }
                    throw "unauthorized request";
                } else {
                    await User.findOneAndUpdate({ phone_number: phone_number }, { $set: { password: password } });
                    const token: string = await jwt.sign({ phone_number: existUser.phone_number }, process.env.SECRET, {
                        expiresIn: '60m'
                    });
                    return token;
                }
            }else{
            throw "unauthorized request";}
        } catch (error) {
            throw error
        }
    },
    async log(phone, token, status) {
        try {
            let existUser = await User.findOne({ phone_number: phone });
            if (!existUser) {
                return false;
            }
            let payload = await jwt.verify(token, process.env.SECRET);
                return payload? true : false
        } catch (error) {
            return false;
        }
    }
}