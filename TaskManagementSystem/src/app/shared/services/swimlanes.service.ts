import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBoard, ICreateSwimlane, ISwimlane, IUpdateBoard } from './Models/boardModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwimlanesService {

 constructor(private http:HttpClient) { }

  createSwimlane(createSwimlane:ICreateSwimlane):Observable<ISwimlane>{
     let result=  this.http.post<ISwimlane>('/api/swimlane',createSwimlane);
     return result;
  }

  getBoard():Observable<IBoard[]>{
    return this.http.get<IBoard[]>('/api/swimlane');
   
  }
   updateBoard(board:IUpdateBoard):Observable<IBoard>{
    return this.http.put<IBoard>(`/api/swimlane`,board);
  }
  deleteSwimlane(swimlaneId:string):Observable<void>{
    return this.http.delete<void>(`/api/swimlane/?swimlaneId=${swimlaneId}`);
  }

  getSwimlaneByBoardId(boardId:string):Observable<IBoard>{
    return this.http.get<IBoard>(`/api/swimlane/${boardId}`);
  }
}
