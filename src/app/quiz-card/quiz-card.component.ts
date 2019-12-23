import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Question} from '../quiz.service';

@Component({
  selector: 'quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css']
})
export class QuizCardComponent {

  @Input() question: Question;
  @Output() questionAnswered = new EventEmitter<boolean>();
  answeredCorrectly: boolean;

  answer(selectedAnswer: string) {
    this.answeredCorrectly = selectedAnswer === this.question.correctAnswer;
    this.questionAnswered.next(this.answeredCorrectly);
  }

}
