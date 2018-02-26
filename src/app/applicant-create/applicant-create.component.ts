import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ApplicantStateService} from '../services/applicant-state.service';

@Component({
  selector: 'app-applicant-create',
  templateUrl: './applicant-create.component.html',
  styleUrls: ['./applicant-create.component.scss']
})
export class ApplicantCreateComponent {
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private applState: ApplicantStateService,
              private httpClient: HttpClient) {
    this.form = new FormGroup({
      first: new FormControl('', [Validators.required]),
      last: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      jobTitle: new FormControl('', [Validators.required]),
      jobDescription: new FormControl('', [Validators.required]),
    }, { updateOn: 'blur' });
  }

  submitApplicantForm() {
    const requestBody = {
      name: `${this.form.get('first').value} ${this.form.get('last').value}`,
      email: this.form.get('email').value,
      jobTitle: this.form.get('jobTitle').value,
      jobDescription: this.form.get('jobDescription').value,
    };
    this.httpClient.post("/api/applicants", requestBody).subscribe((success) => {
      console.log(success);
      this.activeModal.close();
      this.applState.refreshState();
    }, (error) => {
      console.log("Error encountered on applicant creation: " + error.toString());
      this.activeModal.close();
    });
  }

}
