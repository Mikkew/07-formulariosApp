import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css'],
})
export class DinamicosComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([], Validators.required),
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  constructor(private fb: FormBuilder) {}

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  ngOnInit(): void {}

  campoValido(campo: string): boolean | null {
    return (
      (this.miFormulario.controls[campo].errors &&
        this.miFormulario.controls[campo].touched) ||
      Number(this.miFormulario.controls[campo].value) < 0
    );
  }

  agregar(): void {
    if(this.nuevoFavorito.invalid) { return; } 

    this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );
    // this.favoritosArr.push( this.fb.control( this.nuevoFavorito.value, Validators.required ) );

    this.nuevoFavorito.reset();
  }

  guardar(): void {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

  eliminar(index: number): void {
    this.favoritosArr.removeAt(index);
  }
}
