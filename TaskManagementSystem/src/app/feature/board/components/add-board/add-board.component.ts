import { Component,inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { BoardService } from '../../../../shared/services/board.service';
import { IBoard, ICreateBoard, IUpdateBoard } from '../../../../shared/services/Models/boardModel';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-board',
  imports: [ReactiveFormsModule,MatInputModule,MatButtonModule],
  templateUrl: './add-board.component.html',
  styleUrl: './add-board.component.scss'
})
export class AddBoardComponent {
  constructor(
    private boardService:BoardService){
    
  }
  dialogRef=inject(MatDialogRef);
  fb=inject(NonNullableFormBuilder);
  data=inject(MAT_DIALOG_DATA);

  addBoardForm=this.fb.group({
    id:this.fb.control(this.data.board?.id),
    name:this.fb.control(this.data.board?.name,[Validators.required]),
  });

  async createOrEditBoard() {
    if(this.addBoardForm.invalid) {
      return;
    }
    if(this.data.board?.id){
     await this.updateBoard();
    }
    else{
      await this.createBoard();
    }
  }

  private async createBoard() {
    try{
      const result= await firstValueFrom(this.boardService.createBoard(this.addBoardForm.value as ICreateBoard));
      this.dialogRef.close(result);
      console.log('Board created successfully', result);
    }
    catch (error) {
      console.error('Error creating board', error);
    }
  }

  private async updateBoard(){
    try{
      const result= await firstValueFrom(this.boardService.updateBoard(this.addBoardForm.value as IUpdateBoard));
      this.dialogRef.close(result);
      console.log('Board updated successfully', result);
    }
    catch (error) {
      console.error('Error creating board', error);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
