import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.css'],
})
export class UserDetail {

  user: User | null = null;
  carregando: boolean = true;
  erro: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      if (id) {
        this.buscarUsuario(id);
      } else {
        this.erro = "id inválido";
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  buscarUsuario(id: number) {
    this.userService.buscarUsuarioPorId(id).subscribe({
      next: (dados) => {
        this.user = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },

      error: () => {
        this.erro = "Usuario não encontrado :(";
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }
}