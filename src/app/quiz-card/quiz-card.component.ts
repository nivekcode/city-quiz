import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../quiz.service';

@Component({
  selector: 'quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css']
})
export class QuizCardComponent implements OnInit {

  @Input() question: Question;
  answeredCorrectly: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  answer(selectedAnswer: string) {
    this.answeredCorrectly = selectedAnswer === this.question.correctAnswer;
  }

}
