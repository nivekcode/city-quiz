import {
  AfterViewInit,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Question, QuizService} from './quiz.service';
import {QuizCardComponent} from './quiz-card/quiz-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('quizContainer', {read: ViewContainerRef, static: true}) quizContainer: ViewContainerRef;
  questions: Question[] = [];
  quizStarted = false;
  private quizCardFactory: ComponentFactory<QuizCardComponent>;

  constructor(private quizservice: QuizService, private cfr: ComponentFactoryResolver, private injector: Injector) {
  }

  ngOnInit(): void {
    // this.questions.push(this.quizservice.getNextQuestion());
  }

  ngAfterViewInit(): void {
    console.log('Quicontainer', this.quizContainer);
  }

  showNewQuestion() {
    const componenRef = this.quizContainer.createComponent(this.quizCardFactory, null, this.injector);
    const instance = componenRef.instance;
    instance.question = this.quizservice.getNextQuestion();
    instance.questionAnswered.subscribe(() => this.showNewQuestion());
  }

  async startQuiz() {
    const module = await import('./quiz-card/quiz-card.component');
    this.quizCardFactory = this.cfr.resolveComponentFactory(module.QuizCardComponent);
    const componenRef = this.quizContainer.createComponent(this.quizCardFactory, null, this.injector);
    const instance = componenRef.instance;
    instance.question = this.quizservice.getNextQuestion();
    instance.questionAnswered.subscribe(() => this.showNewQuestion());
    this.quizStarted = true;
  }
}
