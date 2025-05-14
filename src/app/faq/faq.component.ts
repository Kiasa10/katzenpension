import { Component } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  questions: { id: string; question: string; answer: string }[] = [
    {
      id: uuid(),
      question: 'Question 1',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet porro qui odio vero cupiditate saepe quos, recusandae temporibus incidunt aut omnis eius iusto aliquid, quas culpa tempore, nulla nihil ad! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio magnam omnis labore adipisci beatae temporibus nam ex facere quos ea enim fuga reprehenderit consequuntur laudantium quaerat ipsum, quisquam voluptates dolores!',
    },
    {
      id: uuid(),
      question: 'Question 2',
      answer:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae, perspiciatis placeat at expedita omnis reiciendis nesciunt corporis quasi ullam laboriosam officiis sapiente aliquam consequatur et commodi earum? Omnis, reprehenderit sequi.',
    },
    {
      id: uuid(),
      question: 'Question 3',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet porro qui odio vero cupiditate saepe quos, recusandae temporibus incidunt aut omnis eius iusto aliquid, quas culpa tempore, nulla nihil ad!',
    },
    {
      id: uuid(),
      question: 'Question 4',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat dolorem enim culpa ipsa sequi molestiae officiis nulla velit natus, minima quis numquam ut architecto accusantium placeat nemo tenetur omnis officia. Impedit minima nihil odit praesentium vel architecto facere quasi, in ipsum quod, quam iusto labore deserunt cum modi corrupti aspernatur animi saepe. Eveniet dolorum, placeat explicabo accusamus laboriosam voluptatibus quas?',
    },
  ];

  showAnswer = '';

  toggleAnswer(id: string) {
    if (this.showAnswer === id) {
      this.showAnswer = '';
    } else {
      this.showAnswer = id;
    }
  }
}
