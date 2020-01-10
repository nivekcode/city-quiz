import {Component, EventEmitter, Input, NgModule, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {Question} from '../quiz.service';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {Subject} from 'rxjs';

@Component({
  selector: 'quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css']
})
export class QuizCardComponent implements OnChanges, OnDestroy {

  @Input() question: Question;
  @Output() questionAnswered = new EventEmitter<boolean>();
  destroy$ = new Subject();
  answeredCorrectly: boolean;

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
