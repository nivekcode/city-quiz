import {Injectable} from '@angular/core';

type answers = 'Bern' | 'Dublin' | 'Chicago' | 'Lisbon' | 'Sao Paulo' | 'Sidney' | 'Vienna';

export interface Question {
  image: string;
  possibleSelections: string[];
  correctAnswer: answers;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private counter = 0;
  private questions: Question[] = [
    {
      image: 'bern.jpeg',
      possibleSelections: ['Bern', 'Lausanne', 'Glasgow', 'Dublin'],
      correctAnswer: 'Bern'
    },
    {
      image: 'chicago.jpeg',
      possibleSelections: ['Chicago', 'Dallas', 'New York', 'London'],
      correctAnswer: 'Chicago'
    },
    {
      image: 'dublin.jpeg',
      possibleSelections: ['Bern', 'Liverpool', 'Dublin', 'London'],
      correctAnswer: 'Dublin'
    },
    {
      image: 'lisbon.jpeg',
      possibleSelections: ['Rom', 'Paris', 'Lisbon', 'London'],
      correctAnswer: 'Lisbon'
    },
    {
      image: 'sao-paulo.jpeg',
      possibleSelections: ['Berlin', 'Sidney', 'London', 'Sao Paulo'],
      correctAnswer: 'Sao Paulo'
    },
    {
      image: 'sidney.jpeg',
      possibleSelections: ['Frankfurt', 'Sidney', 'New York', 'Rio de Janeiro'],
      correctAnswer: 'Sidney'
    },
    {
      image: 'vienna.jpeg',
      possibleSelections: ['Vienna', 'Salzburg', 'New York', 'Lisbon'],
      correctAnswer: 'Vienna'
    }
  ];

  public getNextQuestion(): Question {
    this.counter++;
    return this.questions[this.counter - 1];
  }

}
