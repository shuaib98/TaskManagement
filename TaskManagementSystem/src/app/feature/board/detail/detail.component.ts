import { Component, inject, OnInit } from '@angular/core';
import { BoardService } from '../../../shared/services/board.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SwimlanesService } from '../../../shared/services/swimlanes.service';
import { switchMap, Subject, map } from 'rxjs';
import { ICard, ISwimlane } from '../../../shared/services/Models/boardModel';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCardComponent } from '../components/add-card/add-card.component';
import { CardService } from '../../../shared/services/card.service';


@Component({
  selector: 'app-detail',
  imports: [
    RouterModule, 
    MatIconModule,
    MatInputModule,
    MatButtonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    DragDropModule,
    MatDialogModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private readonly swimlaneService = inject(SwimlanesService);
  private readonly cardService = inject(CardService);
  private readonly matDialog = inject(MatDialog);
  private readonly fb=inject(NonNullableFormBuilder);

  refetch$ = new Subject<void>();
  board = toSignal(
    this.refetch$
    .asObservable()
    .pipe(switchMap(()=>
    this.swimlaneService.getSwimlaneByBoardId(this.activatedRoute.snapshot.params['id'])),
    map(boards => Array.isArray(boards) ? boards[0] : boards) )
  );

  swimlaneForm = this.fb.group({
    name: this.fb.control('', Validators.required),
    });

  cardForm = this.fb.group({
    name: this.fb.control('', Validators.required),
    });

  ngOnInit(): void {
    this.refetch$.next();
  }

  onSwimlaneChange(event:CdkDragDrop<any,any,any>):void{
      moveItemInArray(this.board().swimlanes.cards, event.previousIndex, event.currentIndex);

  }

  onCardChange($event:CdkDragDrop<any,any,any>,swimlane:ISwimlane):void{

      const draggedCard: ICard = $event.item.data;

      if($event.previousContainer === $event.container){
      moveItemInArray(
        swimlane.cards || [], 
        $event.previousIndex, 
        $event.currentIndex);
      }
      else{
        transferArrayItem(
          $event.previousContainer.data,
          $event.container.data,
          $event.previousIndex,
          $event.currentIndex
        );
      }

  const updatedCards =
    swimlane.cards?.map((card, index) => ({
      ...card,
      order: index,
      swimlaneId: swimlane.id,
    })) || [];

    this.cardService.updateCardOrderAndSwimlane(updatedCards)
      .subscribe(() => {
          this.refetch$.next();
      });
  }



     addSwimlane() {
      if (this.swimlaneForm.invalid){
         return;
        }
        const _board = this.board();
        if(!_board) return;

        this.swimlaneService.createSwimlane({
          name: this.swimlaneForm.value.name as string,
          boardId: _board.id,
          order: _board.swimlanes?.length ||0,
        })
        .subscribe(()=>{
          this.swimlaneForm.reset();
          this.refetch$.next();
        });
     }

     deleteSwimlane(swimlane:ISwimlane){
      this.swimlaneService.deleteSwimlane(swimlane.id)
        .subscribe(() => {
          this.refetch$.next();
        });
     }


     addOrEditCard(swimlane: ISwimlane,card?:ICard){
      this.matDialog.open(AddCardComponent,{
        width: '600px',
        data:{
          swimlane: swimlane,
          card,
        }
      })
      .afterClosed()
      .subscribe((card:ICard)=>{
        card&& this.refetch$.next();
      });
     }

     getSortedCards(swimlane: ISwimlane): ICard[] {
       return (swimlane.cards || []).slice().sort((a, b) => a.order - b.order);
  }
}
