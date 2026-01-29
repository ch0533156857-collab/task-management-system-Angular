import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  title = input<string>("Confirm");
  message = input<string>("Are you sure you want to proceed?");
  confirm = output<boolean>();

  onConfirm(): void {
    this.confirm.emit(true);
  }

  onCancel(): void {
    this.confirm.emit(false);
  }
}