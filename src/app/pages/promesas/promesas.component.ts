import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: ``,
})
export class PromesasComponent implements OnInit {
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const promesa = new Promise((resolve, reject) => {
      if (true) {
        resolve('Hola mundo');
      } else {
        reject('Algo salio mal');
      }
    });

    promesa
      .then((mensaje) => {
        console.log('termine!!', mensaje);
      })
      .catch((err) => console.log(err));
    console.log('Fin del OnInit');
  }
}
