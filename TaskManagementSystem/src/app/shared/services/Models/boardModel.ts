import { IUser } from "./userModel";

export interface IBoard{
    id:string;
    name:string;
    user?:IUser;
    swimlanes?:ISwimlane[];

}

export interface ISwimlane{
    id:string;  
    name:string;
    order:number;
    boardId:string;
    board?:IBoard;
    cards?:ICard[];

}
export interface ICreateSwimlane {
    name: string;
    order: number;
    boardId: string;
}


export interface ICard{
    id:string;
    name:string;
    content:string;
    order:number;
    assigne?:IUser;
    swimlaneId:string;  
    swimlane:ISwimlane;
}
export interface IUpdateCardSwimlane {
    cardId: string;
    swimlaneId: string;
    order: number;
}


export interface ICreateBoard {
    name: string;
}
export interface IUpdateBoard {
    id:string;
    name: string;
}