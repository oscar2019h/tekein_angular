
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ApiResponse, Pokemon} from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'http://localhost:8080/pokemon';

  constructor(private http: HttpClient) { }
  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.apiUrl);
  }

  getPokemonByName(name: string): Observable<Pokemon[]> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${name}`).pipe(
      map(response => {
        if (response.statusCode === 200) {
          console.log(`Mensaje de la API: ${response.message}`);
          return response.data;
        } else {
          throw new Error(`Error en la API: ${response.message}`);
        }
      })
    );
  }
  getAllPokemons(): Observable<Pokemon[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => {
        if (response.statusCode === 200) {
          console.log(`Mensaje de la API: ${response.message}`);
          return response.data;
        } else {
          throw new Error(`Error en la API: ${response.message}`);
        }
      })
    );
  }
}
