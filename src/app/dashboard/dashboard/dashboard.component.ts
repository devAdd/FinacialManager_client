import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { TransactionDetail } from 'src/app/models/transactionDetail';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  transactions: TransactionDetail[] = [];
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
   
  }

  //call for total Amount
  
  //call for transaction details
  getTransactionDetails(){  
    this.http.get<any>(`${environment.apiUrl}/transactionDetails`)
    .pipe(
      tap(response => {
        this.transactions = response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        console.log(error.message);
        return of(null);
      })
    ).subscribe();
  }

}
