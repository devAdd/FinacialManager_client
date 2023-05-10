import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject :  BehaviorSubject<User | null>;
  public user : Observable<User | null>;

  constructor(
    private router : Router,
    private http:HttpClient
  ) {
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable();
    }

public get userValue(){
  return this.userSubject.value;
}

login(email:string, password:string){
  return this.http.post<any>(`${environment.apiUrl}/login`,{email,password})
    .pipe(
      tap(user => {
        localStorage.setItem('user',JSON.stringify(user));
        this.userSubject.next(user);
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        console.log(error.message);
        return of(null);
      })
    );
}

logout(){
  localStorage.removeItem('user');
  this.userSubject.next(null);
  this.router.navigate(['']);
}




 


}
