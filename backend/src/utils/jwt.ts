import jwt, {type SignOptions} from "jsonwebtoken";
import type {Secret} from "jsonwebtoken";

export type JwtPayload = {
    id: string;
    email: string;
};

export const signJwt = (payload: JwtPayload, expiresIn?: string) => {
    const secret = process.env.JWT_SECRET as unknown as Secret;

    let options: SignOptions

    const expiration = expiresIn

    if (expiration) {
        options = {
            expiresIn: expiration as unknown as NonNullable<SignOptions["expiresIn"]>
        };
    }

    return jwt.sign(payload, secret, options);
}