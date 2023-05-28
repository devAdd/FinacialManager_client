import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { TransactionService } from 'src/app/service/transaction.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { CustomSnackBarConfig } from '../snackbar/CustomSnackBarConfig';
import { _SnackBarType } from '../../enums/message-template-enum';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss'],
})
export class TransactionDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<TransactionDialogComponent>,
    private builder: FormBuilder,
    private tService: TransactionService,
    public snackBar: MatSnackBar
  ) {}

  considerForCal = true;
  incomeExpense = 'E';
  inputData: any;
  editTransaction = false;
  editForm: any;

  ngOnInit(): void {
    this.inputData = this.data;
    const formData = this.inputData.id;
    if (this.inputData.id) {
      this.setFormData(this.inputData.id);
      this.editTransaction = true;
    }
  }

  setFormData(id: number) {
    this.tService.getTransactionDetail(id).subscribe((res) => {
      this.editForm = res;
      this.transForm.setValue({
        name: this.editForm.name,
        incomeExpense: this.editForm.incomeExpense,
        considerForCal: this.editForm.considerForCal,
        description: this.editForm.description,
        amount: this.editForm.amount,
        category: this.editForm.category,
        date: this.editForm.date,
      });
    });
  }
  dialogClose(actionDialog: string) {
    this.ref.close(actionDialog);
  }

  transForm = this.builder.group({
    name: this.builder.control(''),
    incomeExpense: this.builder.control('E'),
    considerForCal: this.builder.control(1),
    description: this.builder.control(''),
    amount: this.builder.control(''),
    category: this.builder.control(''),
    date: this.builder.control(''),
  });

  saveTrans() {
    if (this.transForm.valid) {
      if (this.editTransaction) {
        this.tService
          .updateTrasaction(this.transForm.value, this.inputData.id)
          .subscribe((res) => {
            const config = new CustomSnackBarConfig();
            config.data = {
              message: 'Transacion Updated Successfully !',
              type: _SnackBarType.success,
            };

            this.snackBar.openFromComponent(SnackbarComponent, config);
            this.dialogClose('');
          });
      } else {
        this.tService.saveTransaction(this.transForm.value).subscribe((res) => {
          const config = new CustomSnackBarConfig();
          config.data = {
            message: 'Transacion Saved Successfully !',
            type: _SnackBarType.success,
          };

          this.snackBar.openFromComponent(SnackbarComponent, config);
          this.dialogClose('');
        });
      }
    }
  }
  toggleChange() {
    this.transForm.value.considerForCal = this.transForm.value.considerForCal
      ? 1
      : 0;
  }
}
