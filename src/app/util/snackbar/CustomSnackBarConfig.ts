import { MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export class CustomSnackBarConfig extends MatSnackBarConfig {
    type!: string;
    override verticalPosition: MatSnackBarVerticalPosition = 'top';
    override horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    override duration = 5000;
    
}