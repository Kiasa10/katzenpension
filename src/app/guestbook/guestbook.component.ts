import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { CommentComponent } from './comment/comment.component';
import { NoCommentComponent } from './no-comment/no-comment.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { Comment } from './comment/comment.model';

@Component({
  selector: 'app-guestbook',
  imports: [CommentComponent, NoCommentComponent, RouterLink],
  templateUrl: './guestbook.component.html',
  styleUrl: './guestbook.component.css',
})
export class GuestbookComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  api = inject(ApiService);
  comments = signal<Comment[] | undefined>(undefined);
  error = signal('');
  order = input<'older' | 'newer'>('newer');
  isFetching = signal(false);

  sortedComments = computed(() =>
    this.comments()?.sort((a, b) => {
      if (this.order() === 'newer') {
        return a.timestamp > b.timestamp ? 1 : -1;
      } else {
        return a.timestamp > b.timestamp ? -1 : 1;
      }
    })
  );

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.api.loadComments().subscribe({
      next: (comments) => {
        this.comments.set(comments);
      },
      error: (err: Error) => {
        this.error.set(err.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe);
  }
}
