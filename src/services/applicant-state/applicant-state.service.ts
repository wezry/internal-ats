import { Injectable } from '@angular/core';
import {Applicant, ApplicantStatus} from '../../models/applicant.model';
import { HttpClient } from '@angular/common/http';
import { groupBy } from 'lodash';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApplicantStateService {

  public applicantList: Applicant[];
  public listQueue: Applicant[] = [];
  public listPhoneScreen: Applicant[] = [];
  public listOnSite: Applicant[] = [];
  public listApproval: Applicant[] = [];

  constructor(private http: HttpClient) { }

  refreshState() {
    this.http.get('api/applicants').subscribe((applicantResp: Applicant[]) => {
        const statusArrays = groupBy(applicantResp, "status");
        this.applicantList = applicantResp || [];
        this.listQueue = statusArrays["In Queue"] || [];
        this.listPhoneScreen = statusArrays["Phone Screen"] || [];
        this.listOnSite = statusArrays["On Site"] || [];
        this.listApproval = statusArrays["Approval"] || [];
      },
      (err) => {
        console.log("Error retrieving applicants: " + err.toString());
        this.applicantList = [];
        this.listQueue = [];
        this.listPhoneScreen = [];
        this.listOnSite = [];
        this.listApproval = [];
      });
  }

  public setApplicantStatus(applicant: Applicant, status: ApplicantStatus, pushQueue: Applicant[]) {
    if (applicant.status === status) {
      pushQueue.push(applicant);
      // No need to update status on the backend.
      return;
    }
    if (applicant._id) {
      applicant.status = status;
      this.http.put("/api/applicants/" + applicant._id, applicant).subscribe(
        (applicantResponse) => {
          pushQueue.push(applicant);
        },
        (err) => {
          console.log("Error encountered on updating applicant: " + err.toString());
          pushQueue.push(applicant);
        });
    } else {
      console.log("Applicant ID undefined. Cannot update applicant.");
    }
  }

  public getApplicant(id: string): Applicant {
    if (this.applicantList) {
      return this.applicantList.find((applicant) => applicant._id === id );
    } else {
      return null;
    }
  }

  public deleteApplicant(id: string): Observable<any> {
    return this.http.delete("/api/applicants/" + id).pipe(
      tap((resp) => { this.refreshState(); }));
  }
}
