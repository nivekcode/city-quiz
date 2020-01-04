import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import {Question} from '../quiz.service';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

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

@NgModule({
  declarations: [QuizCardComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
class QuizCardModule {
}
