import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() {}

  noPuederSer(control: FormControl): null | object {
    const value = control.value?.trim().toLowerCase();
    if (value === 'striker') {
      return {
        noStriker: true,
      };
    }
    return null;
  }

  camposIguales(campo1: string, campo2: string): ValidationErrors | null {
    return (formGroup: AbstractControl) => {
      const password = formGroup.get(campo1)?.value;
      const confirm = formGroup.get(campo2)?.value;

      if(password !== confirm) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return {
          noIguales: true
        }
      }
      
      return null;
    }
  }
}
