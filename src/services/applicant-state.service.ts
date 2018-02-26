import { Injectable } from '@angular/core';
import {Applicant, ApplicantStatus} from '../models/applicant.model';
import { HttpClient } from '@angular/common/http';
import { groupBy } from 'lodash';

@Injectable()
export class ApplicantStateService {

  public applicantList: Applicant[] = [];
  public listQueue: Applicant[] = [];
  public listPhoneScreen: Applicant[] = [];
  public listOnSite: Applicant[] = [];
  public listApproved: Applicant[] = [];

  constructor(private http: HttpClient) { }

  refreshState() {
    this.http.get('api/applicants').subscribe((applicantResp: Applicant[]) => {
        const statusArrays = groupBy(applicantResp, "status");
        this.applicantList = applicantResp || [];
        this.listQueue = statusArrays["In Queue"] || [];
        this.listPhoneScreen = statusArrays["Phone Screen"] || [];
        this.listOnSite = statusArrays["On Site"] || [];
        this.listApproved = statusArrays["Approved"] || [];
      },
      (err) => {
        console.log("Error retrieving applicants: " + err.toString());
        this.applicantList = [];
        this.listQueue = [];
        this.listPhoneScreen = [];
        this.listOnSite = [];
        this.listApproved = [];
      });
  }

  public setApplicantStatus(applicant: Applicant, status: ApplicantStatus, pushQueue: Applicant[]) {
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
    return this.applicantList.find((applicant) => { return applicant._id === id; });
  }
}
