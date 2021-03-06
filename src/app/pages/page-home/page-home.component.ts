import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ApplicantCreateComponent } from '../../applicant-create/applicant-create.component';
import { HttpClient } from '@angular/common/http';
import { Applicant, ApplicantStatus } from '../../../models/applicant.model';

import { groupBy } from 'lodash';
import { ApplicantStateService } from '../../../services/applicant-state/applicant-state.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {

  constructor( private applState: ApplicantStateService,
               private modalService: NgbModal) { }

  ngOnInit() {
    this.applState.refreshState();
  }

  createNewApplicant() {
    this.modalService.open(ApplicantCreateComponent);
  }

  private releaseQueue(event: Applicant) {
    const index = this.applState.listQueue.indexOf(event);
    if (index >= 0) {
      this.applState.listQueue.splice(index, 1);
    }
  }
  private addQueue(event: Applicant) {
      this.applState.setApplicantStatus(event, ApplicantStatus.IN_QUEUE, this.applState.listQueue);
  }

  private releasePhoneScreen(event: Applicant) {
    const index = this.applState.listPhoneScreen.indexOf(event);
    if (index >= 0) {
      this.applState.listPhoneScreen.splice(index, 1);
    }
  }
  private addPhoneScreen(event: Applicant) {
    this.applState.setApplicantStatus(event, ApplicantStatus.PHONE_SCREEN, this.applState.listPhoneScreen);
  }

  private releaseOnSite(event: Applicant) {
    const index = this.applState.listOnSite.indexOf(event);
    if (index >= 0) {
      this.applState.listOnSite.splice(index, 1);
    }
  }
  private addOnSite(event: Applicant) {
    this.applState.setApplicantStatus(event, ApplicantStatus.ON_SITE, this.applState.listOnSite);
  }

  private releaseApproval(event: Applicant) {
    const index = this.applState.listApproval.indexOf(event);
    if (index >= 0) {
      this.applState.listApproval.splice(index, 1);
    }
  }
  private addApproval(event: Applicant) {
    this.applState.setApplicantStatus(event, ApplicantStatus.APPROVAL, this.applState.listApproval);
  }
}
