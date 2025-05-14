import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ApiService } from '../../api.service';

const noWhitespace: ValidatorFn = (control: AbstractControl) => {
  return (control.value || '').trim().length ? null : { hasWhitespace: true };
};

@Component({
  selector: 'app-new-comment',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './new-comment.component.html',
  styleUrl: './new-comment.component.css',
})
export class NewCommentComponent {
  api = inject(ApiService);
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  error = signal('');
  success = signal(false);

  newCommentForm = new FormGroup({
    headline: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(50), noWhitespace],
    }),
    username: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(50), noWhitespace],
    }),
    content: new FormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(800),
        noWhitespace,
      ],
    }),
    date: new FormControl(new Date(), {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if (this.newCommentForm.invalid) {
      console.log('invalid form');
      return;
    }
    const timestamp = new Date();
    const comment = this.newCommentForm.value;
    const subscription = this.api
      .sendComment({
        headline: comment.headline ?? '',
        username: comment.username ?? '',
        content: comment.content ?? '',
        timestamp: timestamp ?? '',
      })
      .subscribe({
        error: (err: Error) => {
          this.error.set(err.message);
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe);

    this.router.navigate(['/guestbook']);
  }
}
