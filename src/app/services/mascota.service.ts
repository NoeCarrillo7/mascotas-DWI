import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  baseUri: string = 'https://backend-api-mascotas.onrender.com/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Método para agregar mascota
  agregarMascota(data: any): Observable<any> {
    let url = `${this.baseUri}/agregar`;
    return this.http.post(url, data)
      .pipe(catchError(this.errorManager));
  }

  // Método para obtener todos las mascotas
  getMascotas(): Observable<any> {
    let url = `${this.baseUri}/mascotas`;
    return this.http.get(url);
  }

  // Método para obtener mascota por ID
  getMascota(id: any): Observable<any> {
    let url = `${this.baseUri}/mascota/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.errorManager)
    );
  }

  // Método para actualizar mascota
  actualizarMascota(id: any, data: any): Observable<any> { 
    let url = `${this.baseUri}/actualizar/${id}`;
    return this.http.put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  // Método para eliminar mascota
  eliminarMascota(id: any): Observable<any> {
    let url = `${this.baseUri}/eliminar/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  // Método para manejar errores
  errorManager(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status} \n Mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => {return errorMessage});
  }

}
