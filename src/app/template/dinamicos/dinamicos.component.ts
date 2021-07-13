import { Component, OnInit, ViewChild } from '@angular/core';
import { Favoritos, Persona } from '../interfaces/template';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {

  // @ViewChild('miFormulario')
  // formulario!: NgForm;

  nuevoFavorito!: string;

  persona: Persona = {
    nombre: "Juan",
    favoritos: [
      { id: 1, nombre: "Metal Gear" },
      { id: 2, nombre: "Basket" }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  guardar(): void {
    console.log("Formulario posteado");
  }

  // nombreValido(): boolean {
  //   return this.formulario?.controls.nombre?.errors;
  // }

  eliminar( index: number): void {
    this.persona.favoritos.splice(index, 1);
  }

  agregar(): void {
    const nuevoFavorito: Favoritos = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoFavorito
    }

    this.persona.favoritos.push( {...nuevoFavorito} );
    this.nuevoFavorito = "";
  }

}
