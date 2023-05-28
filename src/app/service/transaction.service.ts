import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  saveTransaction(data: any) {
    return this.http.post(`${environment.apiUrl}/transactionDetails`, data);
  }

  updateTrasaction(data: any, id: number) {
    return this.http.put(
      `${environment.apiUrl}/transactionDetails/${id}`,
      data
    );
  }

  getTransactionDetail(id: number) {
    return this.http.get(`${environment.apiUrl}/trasactionDetails/${id}`);
  }

  deleteTransaction(id: number) {
    return this.http.delete(`${environment.apiUrl}/trasactionDetails?id=${id}`);
  }
}
