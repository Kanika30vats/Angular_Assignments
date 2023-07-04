import { User } from "src/app/model/user";

export class AddUser {
    static readonly type = '[User] Add';

    constructor(public payload: User) { }
}

export class GetUser {
    static readonly type = '[User] Get';
}

export class Error {
    static readonly type = '[User] Error';

    constructor(public errMsg: string) { };
}