import { Component, input } from '@angular/core';
import { Comment } from './comment.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  comment = input<Comment>();
}
