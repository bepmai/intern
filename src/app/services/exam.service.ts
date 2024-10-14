import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor() { }
  private correctAnswers:string[] = ['B', 'C', 'B', 'C', 'B', 'B', 'A', 'B', 'C', 'C', 'C', 'B', 'B', 'B', 'B', 'A', 'B', 'B', 'B', 'C'
    ]
    private userAnswers: (string | null)[] = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]; 

    updateAnswer(questionIndex: number, answer: string): void {
      this.userAnswers[questionIndex] = answer;
    }
  
    checkAnswers(): number {
      let score = 0;
      this.userAnswers.forEach((answer, index) => {
        if (answer === this.correctAnswers[index]) {
          score++;
        }
      });
      return score; 
    }
  
    resetAnswers(): void {
      this.userAnswers = [null, null, null];
    }
}
