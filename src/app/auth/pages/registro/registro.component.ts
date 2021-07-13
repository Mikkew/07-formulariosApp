import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
// import { 
//   emailPattern, 
//   nombreApellidoPattern, 
//   noPuederSer
// } from 'src/app/shared/validator/validaciones';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        '',
        [Validators.required, Validators.pattern(this.validation.nombreApellidoPattern)],
      ],
      // email: ['', [Validators.required, Validators.email]],
      email: [
        '', 
        [Validators.required, Validators.pattern(this.validation.emailPattern)],
        [this.emailValidator]
      ],
      username: [, [Validators.required, this.validation.noPuederSer]],
      password: [, [Validators.required, Validators.minLength(6)]],
      confirm: [, [Validators.required,]],
    }, 
    {
      validators: [ 
        this.validation.camposIguales('password', 'confirm') 
      ]
    }
  );

  constructor(private fb: FormBuilder, 
              private validation: ValidatorService,
              private emailValidator: EmailValidatorService) {}

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    
    // switch (errors) {
    //   case errors?.required:
    //     return "Email es obligatorio";
    //   case errors?.pattern:
    //     return "El formato del correo no es indicado";
    //   case errors?.emailExiste:
    //     return "El correo ya existe";
    //   default:
    //     return "";
    // }

    if(errors?.required) {
      return "Email es obligatorio";
    } else if(errors?.pattern) {
      return "El formato del correo no es indicado";
    } else if(errors?.emailExiste) {
      return "El correo ya existe";
    } else {
      return "";
    }
  }

  ngOnInit(): void {
    this.miFormulario.setValue({
      nombre: 'Maria Meza',
      email: 'maria.m@gmail.com',
      username: '',
      password: '', 
      confirm: ''
    });
  }

  campoValido(campo: string): boolean | null {
    return (
      (this.miFormulario.controls[campo].errors &&
        this.miFormulario.controls[campo].touched) ||
      Number(this.miFormulario.controls[campo].value) < 0
    );
  }

  guardar(): void {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

  // emailRequired(): boolean {
  //   return this.miFormulario.get('email')?.errors?.required &&
  //       this.miFormulario.get('email')?.touched
  // }

  // emailFormat(): boolean {
  //   return this.miFormulario.get('email')?.errors?.pattern &&
  //       this.miFormulario.get('email')?.touched
  // }

  // emailExiste(): boolean {
  //   return this.miFormulario.get('email')?.errors?.emailExiste &&
  //       this.miFormulario.get('email')?.touched
  // }
  
}
