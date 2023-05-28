import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, tap } from 'rxjs';
import { _SnackBarType } from 'src/app/enums/message-template-enum';
import { TransactionDetail } from 'src/app/models/transactionDetail';
import { TransactionService } from 'src/app/service/transaction.service';
import { ConfirmDialogComponent } from 'src/app/util/confirm-dialog/confirm-dialog.component';
import { CustomSnackBarConfig } from 'src/app/util/snackbar/CustomSnackBarConfig';
import { SnackbarComponent } from 'src/app/util/snackbar/snackbar.component';
import { TransactionDialogComponent } from 'src/app/util/transaction-dialog/transaction-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  transactions: TransactionDetail[] = [];
  grandTotalAmt: number = 0.0;
  expenseTotalAmt: number = 0.0;
  incomeTotalAmt: number = 0.0;

  totalAmount = [
    {
      incomeExpense: 'I',
      amount: 2000.0,
    },
    {
      incomeExpense: 'E',
      amount: 7000.0,
    },
  ];
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private tService: TransactionService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getTransactionDetails();
    this.getTotalAmountDetails();
  }

  //call for total Amount
  getTotalAmountDetails() {
    this.http
      .get<any>(`${environment.apiUrl}/getTotalIncomeAndExpenseAmount`)
      .pipe(
        tap((response) => {
          this.incomeTotalAmt = response.income;
          this.expenseTotalAmt = response.expense;
          this.grandTotalAmt = response.income - response.expense;
          // response.filter((amt: any) => {
          //   if (amt.incomeExpense === 'I') {
          //     this.incomeTotalAmt = amt.amount;
          //     this.grandTotalAmt = this.grandTotalAmt + amt.amount;
          //   } else {
          //     this.expenseTotalAmt = amt.amount;
          //     this.grandTotalAmt = this.grandTotalAmt - amt.amount;
          //   }
          // });
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          console.log(error.message);
          return of(null);
        })
      )
      .subscribe();
  }

  //call for transaction details
  getTransactionDetails() {
    this.http
      .get<any>(`${environment.apiUrl}/transactionDetails`)
      .pipe(
        tap((response) => {
          this.transactions = response;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          console.log(error.message);
          return of(null);
        })
      )
      .subscribe();
  }

  openTransactionDialog(id: number, title: string) {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '40%',
      data: {
        title: title,
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((item) => {
      if (!item) {
        this.getTransactionDetails();
        this.getTotalAmountDetails();
      }
    });
  }
  openAddtransModal() {
    this.openTransactionDialog(0, 'Add Transaction');
  }

  transDataForEdit(tran: TransactionDetail) {
    this.openTransactionDialog(tran.id, 'Update Transaction');
  }

  deleteTransData(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this transaction? ',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed, delete the row
        this.deleteTransaction(id);
      } else {
        // User cancelled, do nothing or handle accordingly
      }
    });
  }

  deleteTransaction(id: number) {
    this.tService.deleteTransaction(id).subscribe((res) => {
      const config = new CustomSnackBarConfig();
      config.data = {
        message: 'Transacion Deleted Successfully !',
        type: _SnackBarType.success,
      };

      this.snackBar.openFromComponent(SnackbarComponent, config);
      this.getTransactionDetails();
      this.getTotalAmountDetails();
    });
  }
}
