import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ApplicantStateService} from '../../../services/applicant-state.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Applicant } from '../../../models/applicant.model';

@Component({
  selector: 'app-page-applicant-detail',
  templateUrl: './page-applicant-detail.component.html',
  styleUrls: ['./page-applicant-detail.component.scss']
})
export class PageApplicantDetailComponent implements OnInit, OnDestroy {

  currentApplicant: Applicant;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private applState: ApplicantStateService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.ngUnsubscribe))
    .subscribe((params) => {
      this.currentApplicant = this.applState.getApplicant(params['id']);
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
