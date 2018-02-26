import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-applicant-detail',
  templateUrl: './page-applicant-detail.component.html',
  styleUrls: ['./page-applicant-detail.component.scss']
})
export class PageApplicantDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
    }).unsubscribe();
  }

}
