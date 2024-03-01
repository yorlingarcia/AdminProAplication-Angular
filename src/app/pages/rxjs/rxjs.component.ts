import { Component, OnDestroy } from '@angular/core';
import {
  Observable,
  Subscription,
  filter,
  interval,
  map,
  retry,
  take,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``,
})
export class RxjsComponent implements OnDestroy {
  public intervalSubscription: Subscription;

  constructor() {
    // this.retornaObservable()
    //   .pipe(retry(1))
    //   .subscribe(
    //     (resp) => console.log('subs: ', resp),
    //     (err) => console.warn(err),
    //     () => console.info('obs terminado')
    //   );
    this.intervalSubscription = this.retornaIntervalo().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(100).pipe(
      map((valor) => valor + 1),
      filter((valor) => valor % 2 == 0)
      // take(10)
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('Llegp al error');
        }
      }, 1000);
    });
  }
}
