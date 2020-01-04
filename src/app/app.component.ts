import {Component, ComponentFactoryResolver, Injector, OnDestroy, SimpleChange, ViewChild, ViewContainerRef} from '@angular/core';
import {QuizService} from './quiz.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  @ViewChild('quizContainer', {read: ViewContainerRef, static: true}) quizContainer: ViewContainerRef;
  quizStarted = false;
  private destroy$ = new Subject();

  constructor(private quizservice: QuizService, private cfr: ComponentFactoryResolver, private injector: Injector) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async showNewQuestion() {
    this.lazyLoadQuizCard();
  }

  async startQuiz() {
    await this.lazyLoadQuizCard();
    this.quizStarted = true;
  }

  private async lazyLoadQuizCard() {
    const {QuizCardComponent} = await import('./quiz-card/quiz-card.component');
    const quizCardFactory = this.cfr.resolveComponentFactory(QuizCardComponent);
    const componenRef = this.quizContainer.createComponent(quizCardFactory, null, this.injector);
    const instance = componenRef.instance;
    instance.question = this.quizservice.getNextQuestion();
    instance.questionAnswered.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.showNewQuestion());
    (instance as any).ngOnChanges({
      question: new SimpleChange(null, instance.question, true)
    });
  }
}
