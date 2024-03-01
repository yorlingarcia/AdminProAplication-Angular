import { Component } from '@angular/core';
import { Observable, interval, map, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``,
})
export class RxjsComponent {
  constructor() {
    // this.retornaObservable()
    //   .pipe(retry(1))
    //   .subscribe(
    //     (resp) => console.log('subs: ', resp),
    //     (err) => console.warn(err),
    //     () => console.info('obs terminado')
    //   );
    this.retornaIntervalo().subscribe(console.log);
  }

  retornaIntervalo(): Observable<number> {
    return interval(1000).pipe(
      take(4),
      map((valor) => valor + 1)
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
