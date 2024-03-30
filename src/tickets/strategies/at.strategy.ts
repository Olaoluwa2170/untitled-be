import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";


@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, "jwt") {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "access-token-secret",
        })
    }

    validate(payload: any) {
        console.log("AT strategy", payload)
        return payload
    }
}