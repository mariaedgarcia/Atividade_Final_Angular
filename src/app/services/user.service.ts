import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // API de teste
  private readonly API = 'https://jsonplaceholder.typicode.com/users';

  // get
  constructor(private http: HttpClient){
  }

  // Manda os dados que ainda não foi executado
  listarUsuarios(): Observable<User[]>{
    return this.http.get<User[]>(this.API);
  }

  buscarUsuarioPorId(id: number): Observable<User>{
    const url = `${this.API}/${id}`
    return this.http.get<User>(url)
  }
}
