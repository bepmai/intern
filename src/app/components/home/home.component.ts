import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import * as bootstrap from 'bootstrap';
import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  score: number | null = null;

  isLoading = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private examService: ExamService
  ) {}

  countdownTime = 60;
  completedQuestions = 0;
  answeredQuestions = [false, false, false, false, false];
  countdownInterval: any;

  ngOnInit() {
    this.startCountdown();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.countdownInterval);
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      if (this.countdownTime > 0) {
        this.countdownTime--;
      } else {
        clearInterval(this.countdownInterval);
        this.submitQuiz();
      }
    }, 1000);
  }

  updateCompletedQuestions(questionIndex: number, answer: string): void {
    this.examService.updateAnswer(questionIndex, answer);

    console.log(`Question ${questionIndex + 1} answered`);
    if (!this.answeredQuestions[questionIndex]) {
      this.answeredQuestions[questionIndex] = true;
      this.completedQuestions++;
    }
  }

  scrollToQuestion(questionIndex: number) {
    const element = document.getElementById(`question${questionIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  submitQuiz() {
    const modalElement = document.getElementById('confirmModal_endtime');
    if (modalElement) {
      const confirmModal = new bootstrap.Modal(modalElement, {
        backdrop: 'static',
        keyboard: false,
      });

      modalElement.addEventListener('hidden.bs.modal', () => {
        this.confirmSubmit();
      });

      confirmModal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  confirmSubmit() {
    clearInterval(this.countdownInterval);

    const modalElement = document.getElementById('confirmModal');
    if (modalElement) {
      const confirmModal = bootstrap.Modal.getInstance(modalElement);
      if (confirmModal) {
        confirmModal.hide();
      }
    }

    const modalBackdrops = document.getElementsByClassName('modal-backdrop');
    while (modalBackdrops.length > 0) {
      modalBackdrops[0].parentNode?.removeChild(modalBackdrops[0]);
    }

    this.score = this.examService.checkAnswers();
    console.log(`User's score: ${this.score}`);

    this.router.navigate(['/result'], { queryParams: { score: this.score } });
  }

  LogOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
