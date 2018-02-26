import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Question } from '../../models/question.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionBankComponent implements OnInit {
  @Output() selectedQuestion: EventEmitter<Question> = new EventEmitter<Question>();
  questions: Array<Question>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('api/questions').subscribe((questions: Array<Question>) => {
      this.questions = questions;
    })
  }

}
