import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth : AuthenticationService,
    private router:Router,
    private http:HttpClient) { }

  ngOnInit(): void {
  }
  login(loginForm:NgForm){    
    const user = 
    this.auth.login(loginForm.value.username,loginForm.value.password).subscribe(response => {
      if(response){
        this.router.navigate(['/home/dashboard']);
      }
    });
  
// this.http.get<any>("http://localhost:8080/test")
//     .pipe(
//       tap(res => {
//         console.log("Respone :"+res);
//       }),
//       catchError((error: HttpErrorResponse) => {
//         console.log(error.status);
//         console.log(error.message);
//         return of(null);
//       })
//     ).subscribe();

       
  }

    
  
}
