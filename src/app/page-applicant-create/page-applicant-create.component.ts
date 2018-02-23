import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-page-applicant-create',
  templateUrl: './page-applicant-create.component.html',
  styleUrls: ['./page-applicant-create.component.scss']
})
export class PageApplicantCreateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
