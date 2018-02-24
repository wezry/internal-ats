import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page-applicant-create',
  templateUrl: './page-applicant-create.component.html',
  styleUrls: ['./page-applicant-create.component.scss']
})
export class PageApplicantCreateComponent implements OnInit {
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal, public httpClient: HttpClient) {
    this.form = new FormGroup({
      first: new FormControl('', [Validators.required]),
      last: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      jobTitle: new FormControl('', [Validators.required]),
      jobDescription: new FormControl('', [Validators.required]),
    }, { updateOn: 'blur' });
  }

  ngOnInit() {
  }

  submitApplicantForm() {
    let requestBody = {
      name: `${this.form.get('first').value} ${this.form.get('last').value}`,
      email: this.form.get('email').value,
      jobTitle: this.form.get('jobTitle').value,
      jobDescription: this.form.get('jobDescription').value,
    };
    console.log(requestBody);
    this.httpClient.post("/api/applicants", requestBody).subscribe((success) => {
      console.log(success);
      this.activeModal.close();
    }, (error) => {
      console.log(error);
    })
  }

}
