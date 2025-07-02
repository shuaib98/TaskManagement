import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ILogin, ILoginResponse } from '../../../shared/services/Models/userModel';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [MatInput,ReactiveFormsModule,MatFormFieldModule,RouterLink,MatButton],
  standalone:true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private userService:UserService,
    private authService:AuthService,
    private router:Router,
    private snackBar: MatSnackBar

  ){}

  
  fb=inject(NonNullableFormBuilder);
  registerForm=this.fb.group({
    email:this.fb.control('',[Validators.required,Validators.email]),
    password:this.fb.control('',[Validators.required,Validators.minLength(8)]),

  });

  async login(){
    if(this.registerForm.invalid){
      return;
    }

    try {
      const token: ILoginResponse = await firstValueFrom(this.userService.login(this.registerForm.value as ILogin));
      this.authService.token = token.accessToken;
      console.log('User login');
      this.showMessage('user login successfully');
      this.router.navigateByUrl('/board');
    } catch (error) {
      console.error('Login failed', error);
      this.showMessage('Invalid username and password','snackbar-error'); 
    }
  }

  showMessage(message: string, panelClass: string = 'snackbar-success') {
    this.snackBar.open(message, '', {
      duration: 3000, 
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [panelClass],
    });
  }
}