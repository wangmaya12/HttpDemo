import {
  trigger,
  transition,
  animate,
  style,
  state,
  keyframes,
  animation,
  useAnimation,
} from '@angular/animations';
export let bounceOutLeftAnimation = animation(
  animate(
    '0.8s ease-in',
    keyframes([
      style({
        offset: 0.2,
        opacity: 1,
        transform: 'translateX(20px)',
      }),
      style({
        offset: 1,
        opacity: 0,
        transform: 'translateX(-100%)',
      }),
    ])
  )
);
export let slide = trigger('slide', [
  state('void', style({ opacity: 0 })),
  transition(':enter', [
    style({ backgroundColor: 'orange', transform: 'translateX(-10px)' }),
    animate(1000),
  ]),
  transition(':leave', [
    useAnimation(bounceOutLeftAnimation),
    // animate(1000, style({ transform: 'translateX(-100%)' })),
  ]),
]);

export let fade = trigger('fade', [
  state('void', style({ opacity: 0 })),
  transition('void<=>*', [style({ backgroundColor: 'orange' }), animate(1000)]),
]);
