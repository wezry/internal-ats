import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.scss']
})
export class ApplicationCardComponent implements OnInit {
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
