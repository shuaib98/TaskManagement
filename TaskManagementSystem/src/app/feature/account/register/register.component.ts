import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import {MatButton} from '@angular/material/button'
import { UserService } from '../../../shared/services/user.service';
import { ILoginResponse, IRegister } from '../../../shared/services/Models/userModel';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [MatInput,ReactiveFormsModule,MatFormFieldModule,RouterLink,MatButton],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
constructor(
  private userService:UserService,
  private authService:AuthService,
  private router:Router
){}

  fb=inject(NonNullableFormBuilder);
  registerForm=this.fb.group({
    email:this.fb.control('',[Validators.required,Validators.email]),
    userName:this.fb.control('',[Validators.required]),
    password:this.fb.control('',[Validators.required,Validators.minLength(8)]),
    firstName:this.fb.control('',[Validators.required]),
    lastName:this.fb.control('',[Validators.required])
  });

  async register(){
    if(this.registerForm.invalid){
      return;
    }

    await this.userService.register(this.registerForm.value as IRegister).subscribe({
      next:(token:ILoginResponse)=>{
        this.authService.token=token.accessToken;
        console.log('user registerd');
        this.router.navigateByUrl('/login');
      },
      error:(err)=>{
        console.error(err);
      }
    });
  }
}
