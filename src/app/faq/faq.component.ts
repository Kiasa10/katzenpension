import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-faq',
  imports: [RouterLink],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  questions: { id: string; question: string; answer: string }[] = [
    {
      id: uuid(),
      question:
        'Welche Impfungen und Voraussetzungen muss meine Katze erfüllen?',
      answer:
        'Um die Gesundheit aller Gäste zu schützen, ist ein gültiger Impfschutz gegen Katzenschnupfen und Katzenseuche Pflicht. Bei Freigängern wird zusätzlich eine Tollwut-Impfung verlangt. Zudem muss die Katze kurz vor dem Aufenthalt entwurmt und gegen Parasiten (Flöhe/Zecken) behandelt worden sein. Ein gültiger Impfpass muss beim Check-in abgegeben werden.',
    },
    {
      id: uuid(),
      question: 'Mein Tier braucht Medikamente – ist das ein Problem?',
      answer:
        'Nein. Ich bin darin geschult, Tabletten zu geben oder Spezialfutter zu verabreichen. Wichtig ist, dass die Medikamente in ausreichender Menge und mit einer genauen Dosierungsanleitung mitgegeben werden. Chronische Erkrankungen sollten unbedingt beim Erstgespräch geklärt werden.',
    },
    {
      id: uuid(),
      question: 'Was passiert, wenn meine Katze krank wird?',
      answer:
        'Meine Pension hat einen Notfallplan. Im Vertrag wird festgehalten, welcher Tierarzt im Notfall aufgesucht werden soll (entweder der Haustierarzt oder ein Partner-Tierarzt in der Nähe). Der Besitzer wird im Ernstfall natürlich sofort informiert.',
    },
    {
      id: uuid(),
      question: 'Muss ich das eigene Futter mitbringen?',
      answer:
        'Grundsätzlich empfehle ich, eigenes Futter mitzubringen, da eine abrupte Futterumstellung zusätzlichen Stress für den Magen bedeuten kann. Wenn ich das gewohnte Futter Ihrer Samptpfote füttere, bleibt zumindest dieser Teil des Alltags für sie beständig. Auf Wunsch biete ich jedoch auch ein hochwertiges Inklusiv-Futter an.',
    },
    {
      id: uuid(),
      question: 'Wie wird die Katze untergebracht – Gruppe oder Einzelzimmer?',
      answer:
        'Das kommt ganz auf Ihr Tier und Ihre Wünsche an. Ich biete Gruppenhaltung, welche nur für sozialisierte, kastrierte Katzen geeignet ist an.Der Vorteil hierbei ist, dass es mehr Platz, Spielmöglichkeiten und natürlich Kameraden gibt. Für Katzen, die eher schüchtern sind, keineArtgenossen mögen oder für Senioren bzw. Katzen mit speziellen Bedürfnissen ist ein Einzelzimmer ideal. Genauere Infos über die angebotenenRäumlichkeiten finden Sie unter dem Menüpunkt Zimmer',
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

  splitAnswer(answer: string) {
    const target = 'Zimmer';
    const lastIndex = answer.lastIndexOf(target);
    if (lastIndex === -1) {
      return { hasLink: false, before: answer, after: '' };
    }

    const before = answer.substring(0, lastIndex);
    const after = answer.substring(lastIndex + target.length);
    return { hasLink: true, before, after };
  }
}
