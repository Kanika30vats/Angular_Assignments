import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { User } from "src/app/model/user";
import { UserService } from "src/app/service/user.service";
import { AddUser, Error, GetUser } from "../action/user.action";
import produce from 'immer';

export class UserStateModel {
    data: any;
    err: any;
    result: any;

    constructor() {
        this.data = [];
    }
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        data: [],
        err: "",
        result: []
    }
})

@Injectable()
export class UserState {

    constructor(
        private userService: UserService
    ) { }

    @Selector()
    static getUser(state: UserStateModel) {
        return state.data;
    }

    @Selector()
    static getUserFromAPI(state: UserStateModel) {
        return state.result;
    }

    @Selector()
    static getError(state: UserStateModel) {
        return state.err;
    }

    @Action(AddUser)
    registerUser(context: StateContext<UserStateModel>, { payload }: any) {

        return this.userService.addUser(payload).subscribe(
            res => {
                const state = context.getState();

                context.setState(
                    {
                        ...state,
                        data: payload
                    }
                )
            },
            err => {
                const state = context.getState();

                context.setState(
                    {
                        ...state,
                        err: "Registration failed!"
                    }
                )
            }
        );
    }

    @Action(GetUser)
    getUserFromAPI(context: StateContext<UserStateModel>) {
        this.userService.getUser().subscribe(
            res => {
                
                if (res == null) {
                    context.dispatch(new Error("Data not accessible."));

                }
            }
            
        );
    }

    @Action(Error)
    errorHandle(context: StateContext<UserStateModel>, { errMsg }: any) {
        context.setState(produce((draft: UserStateModel) => {
            draft.result = null;
            draft.err = errMsg;
        }));
    }

}