export interface ILogin{
    email:string;
    password:string;
}

export interface IRegister extends ILogin{
    firstName:string;
    lastName:string;
    userName:string;
}

export interface ILoginResponse{
    accessToken:string;
}

export interface IUser{
    id:string;
    email:string;
    firstName:string;
    lastName:string
}