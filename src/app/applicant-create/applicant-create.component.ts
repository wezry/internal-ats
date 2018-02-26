import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ApplicantStateService} from '../../services/applicant-state.service';

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
      text: new FormGroup({
        first: new FormControl('', [Validators.required]),
        last: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        jobTitle: new FormControl('', [Validators.required]),
        jobDescription: new FormControl('', [Validators.required]),
      }, { updateOn: 'blur'}),
      // first: new FormControl('', [Validators.required]),
      // last: new FormControl('', [Validators.required]),
      // email: new FormControl('', [Validators.required, Validators.email]),
      // jobTitle: new FormControl('', [Validators.required]),
      // jobDescription: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    }, { updateOn: 'change'});
  }

  ngOnInit() {
  }

  submitApplicantForm() {
    const requestBody = {
      name: `${this.form.get('text').get('first').value} ${this.form.get('text').get('last').value}`,
      email: this.form.get('text').get('email').value,
      jobTitle: this.form.get('text').get('jobTitle').value,
      jobDescription: this.form.get('text').get('jobDescription').value,
      status: this.form.get('status').value
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
