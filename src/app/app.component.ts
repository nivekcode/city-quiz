import {AfterViewInit, Component, ComponentFactoryResolver, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Question, QuizService} from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('quizContainer', {read: ViewContainerRef, static: true}) quizContainer: ViewContainerRef;
  questions: Question[] = [];
  quizStarted = false;

  constructor(private quizservice: QuizService, private cfr: ComponentFactoryResolver, private injector: Injector) {
  }

  ngOnInit(): void {
    // this.questions.push(this.quizservice.getNextQuestion());
  }

  ngAfterViewInit(): void {
    console.log('Quicontainer', this.quizContainer);
  }

  showNewQuestion() {
    this.questions.push(this.quizservice.getNextQuestion());
  }

  async startQuiz() {
    const {QuizCardComponent} = await import('./quiz-card/quiz-card.component');
    const factory = this.cfr.resolveComponentFactory(QuizCardComponent);
    const componenRef = this.quizContainer.createComponent(factory, null, this.injector);
    const instance = componenRef.instance;
    instance.question = this.quizservice.getNextQuestion();
    this.quizStarted = true;
  }
}
