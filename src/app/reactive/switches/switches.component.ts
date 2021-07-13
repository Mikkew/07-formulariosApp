import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    genero: [, Validators.required ],
    notificaciones: [, Validators.required ],
    condiciones: [, Validators.requiredTrue ],
  })

  persona = {
    genero: 'F',
    notificaciones: true,
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.reset( {...this.persona, condiciones: false} );
    // this.miFormulario.setValue( this.persona );

    // this.miFormulario.get('condiciones')?.valueChanges.subscribe( newValue => {
    //   console.log(newValue);
    // })

    this.miFormulario.valueChanges.subscribe( ({condiciones, ...restoDeArgumentos} )=> {
      // delete form.condiciones;
      this.persona = restoDeArgumentos;
      
      // console.log(form);
    })
  }

  guardar(): void {
    const formValue = {...this.miFormulario.value};
    delete formValue.condiciones;

    this.persona = formValue;

    console.log( formValue );
    
  }

}
