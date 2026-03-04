import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient){
  }

  listarUsuarios(): Observable<User[]>{
    return this.http.get<User[]>(this.API);
  }

  buscarUsuarioPorId(id: number): Observable<User>{
    const url = `${this.API}/${id}`
    return this.http.get<User>(url)
  }
}
