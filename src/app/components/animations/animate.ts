import { trigger, transition, animate, style, keyframes, sequence } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOutAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('1s', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('1s', style({ opacity: 0 })),
  ]),
]);
export const repeatfadeInOutAnimation = trigger('repeatfadeInOutAnimation', [
  transition('* => *', [
    style({ opacity: 0 }),
    animate('1s', keyframes([
      style({ opacity: 0, offset: 0 }),
      style({ opacity: 1, offset: 1 }),
    ])),
  ]),
]);