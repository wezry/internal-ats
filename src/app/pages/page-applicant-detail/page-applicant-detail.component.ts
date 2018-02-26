import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ApplicantStateService} from '../../../services/applicant-state/applicant-state.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Applicant } from '../../../models/applicant.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService } from '../../../services/confirmation-modal/confirmation-modal.service';
import { Question } from '../../../models/question.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-applicant-detail',
  templateUrl: './page-applicant-detail.component.html',
  styleUrls: ['./page-applicant-detail.component.scss']
})
export class PageApplicantDetailComponent implements OnInit, OnDestroy {

  currentApplicant: Applicant;
  ngUnsubscribe: Subject<void> = new Subject<void>();
  profile: any;

  constructor(private applState: ApplicantStateService,
              private confirmationModal: ConfirmationModalService,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        this.currentApplicant = this.applState.getApplicant(params['id']);
        if (!this.currentApplicant) {
          this.http.get('api/applicants/' + params['id']).subscribe((val: any) => {
            this.currentApplicant = val;
          });
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openConfirmationModal() {
    this.confirmationModal.createConfirmationModal(
      {title: "Are you sure you wish to delete " + this.currentApplicant.name + "?",
        message: "Deleting the applicant will remove all stored information."}
    ).then((result) => {
      if (result) {
        this.removeApplicant();
      }
    });
  }

  private removeApplicant() {
    this.applState.deleteApplicant(this.currentApplicant._id).subscribe(
      (deleteResp) => {
        this.router.navigate([""]);
      },
      (err) => { console.log("Error in applicant deletion: " + err.toString()); }
    );
  }

  addSelectedQuestion(question: Question) {
    console.log(question);
  }
}
