import { Component, Input, OnInit } from '@angular/core';
import { Applicant } from '../../models/applicant.model';

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.scss']
})
export class ApplicationCardComponent implements OnInit {
  @Input() applicant: Applicant;

  constructor() { }

  ngOnInit() {
  }

}
