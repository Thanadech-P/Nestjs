import 'dotenv/config';

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "../../../config/index";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            ignoreExpiration: false,
            secretOrKey: config.jwt_secret_key,
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                if (request.cookies && request.cookies.access_token) {
                    return request.cookies.access_token;
                  }
                return null
            }])
        });
    }

    async validate(payload: any) {
        if (payload === null) {
            throw new UnauthorizedException();
        }
        return payload;
    }
}