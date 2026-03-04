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
    this.userService.listarUsuarios().subscribe({
      next: (dados) => {
        this.usuarios = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.erro = true;
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }
}