import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup({
  //   'producto'    : new FormControl("RXT Juan"),
  //   'precio'      : new FormControl(0),
  //   'existencias' : new FormControl(0),
  // });

  miFormulario: FormGroup = this.fb.group({
    producto: [ ,  [Validators.required, Validators.minLength(3)], ],
    precio: [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)],]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.setValue({
      producto: "JDNJE - 8373",
      precio: 1243.43,
      existencias: 10
    })
  }

  campoValido(campo: string): boolean | null {

    return this.miFormulario.controls[campo].errors && 
           this.miFormulario.controls[campo].touched ||
           Number(this.miFormulario.controls[campo].value) < 0;
  }

  guardar( ): void {
    if( this.miFormulario.invalid ) {

      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log( this.miFormulario.value );
    this.miFormulario.reset();
    
  }
}
