import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { firstValueFrom } from 'rxjs';
import { BoardService } from '../../../../shared/services/board.service';
import { ICard, ICreateBoard, IUpdateBoard } from '../../../../shared/services/Models/boardModel';
import { CardService } from '../../../../shared/services/card.service';

@Component({
  selector: 'app-add-card',
   imports: [ReactiveFormsModule,MatInputModule,MatButtonModule],
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.scss'
})
export class AddCardComponent {
  constructor(
    private cardService:CardService){
    
  }
  dialogRef=inject(MatDialogRef);
  fb=inject(NonNullableFormBuilder);
  data=inject(MAT_DIALOG_DATA);

  addCardForm=this.fb.group({
    order: this.fb.control(this.data.swimlane.cards.length),
    boardId:this.fb.control(this.data.swimlane.boardId),
    swimlaneId:this.fb.control(this.data.swimlane.id),
    name:this.fb.control(this.data.card?.name,[Validators.required]),
    content:this.fb.control(this.data.card?.content,[Validators.required])
  });

  async createOrEditCard() {
    if(this.addCardForm.invalid) {
      return;
    }
    if(this.data.card?.id){
      await this.updateCard();
    }
    else{
      await this.createCard();
    }
  }

  private async createCard() {
    try{
      const result= await firstValueFrom(this.cardService
        .createCard(this.addCardForm.value as Partial<ICard>));

      this.dialogRef.close(result);
      console.log('Card created successfully', result);
    }
    catch (error) {
      console.error('Error creating Card', error);
    }
  }

  
  private async updateCard(){
    try{
      const result= await firstValueFrom(this.cardService
        .updateCard(this.addCardForm.value as Partial<ICard>));

      this.dialogRef.close(result);
      console.log('Card updated successfully', result);
    }
    catch (error) {
      console.error('Error creating Card', error);
    }
  }
  deleteCard(){

  }

  closeDialog() {
    this.dialogRef.close();
  }


}
