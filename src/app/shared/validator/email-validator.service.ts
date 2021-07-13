import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService implements AsyncValidator {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  validate(control: AbstractControl ): Observable<ValidationErrors | null> {
    const  email = control.value;

    let params = new HttpParams();
    params = params.append('q', email);

    return this.http.get<any[]>(`${this.apiUrl}/usuarios`, { params: params})
            .pipe(
              delay(3000),
              map(resp =>{
                return (resp.length === 0)?  null : {emailExiste:true}
              })
            );
    
  }
}
