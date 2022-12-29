import {IUser} from "./IUser";

interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface IAuth {
    tokens: ITokens;
    user: IUser;
}