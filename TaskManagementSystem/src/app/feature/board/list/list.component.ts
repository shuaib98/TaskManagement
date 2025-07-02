import { Component, OnInit, Signal ,inject } from '@angular/core';
import{BoardService} from '../../../shared/services/board.service';
import {toSignal} from '@angular/core/rxjs-interop';
import { IBoard } from '../../../shared/services/Models/boardModel';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddBoardComponent } from '../components/add-board/add-board.component';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [CommonModule,RouterModule,MatButtonModule,MatDialogModule,MatCardModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  refetch$=new Subject<void>();
  boards=toSignal(
    this.refetch$
    .asObservable()
    .pipe(switchMap(()=> this.boardService.getBoard())));
  
  constructor(
    private dialog:MatDialog,
    private boardService:BoardService
  ) {}

  ngOnInit(): void {
    this.refetch$.next();
  }

  openNewBoardFlow(board?:IBoard){
    this.dialog.open(AddBoardComponent, {
      width: '400px', 
      data:{
        board
      },
    })
    .afterClosed()
    .subscribe((board:IBoard)=>{
      board && this.refetch$.next();
    });

  }
  deleteBoard(boardId:string){
    this.boardService.deleteBoard(boardId).subscribe({
      next:()=>{
        this.refetch$.next();
      },
      error:(err)=>{
        console.error(err);
      }
    });
  }
}
 