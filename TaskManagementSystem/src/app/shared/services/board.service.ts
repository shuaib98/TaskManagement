import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBoard, ICreateBoard, IUpdateBoard } from './Models/boardModel';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(
    private http:HttpClient
  ) { }

  createBoard(createBoard:ICreateBoard):Observable<IBoard>{
     let result=  this.http.post<IBoard>('/api/boards/create',createBoard);
     return result;
  }

  getBoard():Observable<IBoard[]>{
    return this.http.get<IBoard[]>('/api/boards');
   
  }
   updateBoard(board:IUpdateBoard):Observable<IBoard>{
    return this.http.put<IBoard>(`/api/boards`,board);
  }
  deleteBoard(boardId:string):Observable<void>{
    return this.http.delete<void>(`/api/boards/?boardId=${boardId}`);
  }

  getBoardById(boardId:string):Observable<IBoard>{
    return this.http.get<IBoard>(`/api/boards/board-by-id/?boardId=${boardId}`);
  }
}
