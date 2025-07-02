import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILogin, ILoginResponse, IRegister } from './Models/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  
  constructor(
    private http:HttpClient
  ) { }

   login(login:ILogin):Observable<ILoginResponse>{
    return  this.http.post<ILoginResponse>('/api/authentication/login',login);

  }

  register(register:IRegister):Observable<ILoginResponse>{
    return this.http.post<ILoginResponse>('/api/authentication/register',register)
   
  }
}
