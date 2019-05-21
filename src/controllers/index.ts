import { Request, Response } from 'express';
import { User } from '../models/User'
import { InterfaceUser } from '../interfaces/user';
import { interfaceUserService } from '../interfaces/userService'
import { UserService } from '../services/UserService';
import * as mongoose from 'mongoose'
import { globalAgent } from 'https';
import { RSA_NO_PADDING } from 'constants';
export class index {
    async firstRegistration(req: Request, res: Response) {
        if (req.file) {
            req.body.avatar = req.file.path;
        }
        req.check('email', 'invalid email').isEmail();
        req.check('phone_number', " invalid phone number ").isMobilePhone('ar-EG');
        if (req.validationErrors()) {
            res.status(422).json({ errors: req.validationErrors() });
        }
        try {
            let result = await UserService.firstStep(req.body);
            res.status(201).send(result);
        } catch (error) {
            res.status(400).send({ msg: "bad request" })
        }
    }

    async secondRegistration(req: Request, res: Response) {
        req.check('phone_number', " invalid phone number ").isMobilePhone('ar-EG');
        req.check('password', " invalid phone password ").isLength({ min: 8 });
        if (req.validationErrors()) {
            res.status(422).json({ errors: req.validationErrors() });
        } else {
            try {
                let token = await UserService.lastStep(req.body.password, req.body.phone_number);
                res.status(200).send({ token, "hint": "token expires in 60m" });
            } catch (error) {
                res.status(403).send({ 'msg': error });
            }
        }
    }
    async third(req: Request, res: Response) {
        req.check('phone_number', " invalid phone number ").isMobilePhone('ar-EG');
        req.check('status', " allowed value is enable or disable ").isIn(["enable", "disable"]);
        if (req.validationErrors()) {
            res.status(422).json({ errors: req.validationErrors() });
        }
        try {
            let success = await UserService.log(req.body.phone_number, req.body.token, req.body.status);
            if (success) {
                let user = await User.findOne({ phone_number: req.body.phone_number }, { password: 0 });
                res.status(202).send(user);
            }
            throw "unauthorized request";
        } catch (error) {
            res.status(403).send({ 'msg': error });
        }
    }


} 
