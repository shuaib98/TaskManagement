import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICard, IUpdateCardSwimlane } from './Models/boardModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private http:HttpClient
  ) { }

    createCard(card:Partial<ICard>):Observable<ICard>{
       let result=  this.http.post<ICard>('/api/cards',card);
       return result;
    }

    updateCard(board:Partial<ICard>):Observable<ICard>{
        return this.http.put<ICard>(`/api/cards`,board);
    }

    updateCardOrderAndSwimlane(items:ICard[]):Observable<ICard[]>{
        return this.http.patch<ICard[]>(`/api/cards`,items);
    }
}
