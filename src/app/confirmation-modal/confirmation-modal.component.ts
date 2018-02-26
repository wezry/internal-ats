import { Component, OnInit } from '@angular/core';
import { ConfirmationModalService } from '../../services/confirmation-modal/confirmation-modal.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  title: string;
  message: string;

  constructor(private confModal: ConfirmationModalService) { }

  ngOnInit() {
    this.title = this.confModal.title;
    this.message = this.confModal.message;
  }

  confirm() {
    this.confModal.modalRef.close(true);
  }

  dismiss() {
    this.confModal.modalRef.dismiss(false);
  }
}
