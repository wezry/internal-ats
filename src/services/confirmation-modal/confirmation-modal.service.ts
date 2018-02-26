import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../app/confirmation-modal/confirmation-modal.component';

@Injectable()
export class ConfirmationModalService {

  title: string;
  message: string;
  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  public createConfirmationModal(modalOptions: {title: string, message: string}): Promise<any> {
    this.setState(modalOptions);
    this.modalRef = this.modalService.open(ConfirmationModalComponent);
    return this.modalRef.result;
  }

  private setState(modalOptions) {
    this.title = modalOptions.title;
    this.message = modalOptions.message;
  }
}
