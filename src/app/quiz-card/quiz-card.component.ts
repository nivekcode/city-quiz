import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../quiz.service';

@Component({
  selector: 'quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css']
})
export class QuizCardComponent implements OnInit {

  @Input() question: Question;

  constructor() {
  }

  ngOnInit() {
  }

}
