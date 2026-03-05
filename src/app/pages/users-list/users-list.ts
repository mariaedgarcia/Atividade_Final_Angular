import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-list',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.css'],
})
export class UsersList implements OnInit {
  usuarios: User[] = [];
  carregando: boolean = true;
  erro: boolean = false;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // os dados dos usuários vem do http e acaba que eles não chegam "na hora", então foi necessário o uso
    // do subscribe para esperar os dados chegarem, e quando isso acontece ele mostra na tela.
    this.userService.listarUsuarios().subscribe({
      // Quando funcionar
      next: (dados) => {
        this.usuarios = dados; //  Dados vão p/ variável usuario
        this.carregando = false;
        this.cdr.detectChanges();
      },
      // Se der errado
      error: (err) => {
        console.error(err);
        this.erro = true;
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }
}