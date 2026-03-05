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
  // O | é o que esta fazendo a união entre a variável e vazio
  user: User | null = null;
  carregando: boolean = true;
  erro: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Nesse caso ele foi pegando o id que está dentro do meu componente por meio do método get, 
    // e o valor do ID foi usado para buscar o usuário correspondente.
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      // Verifica se o ID é válido
      if (id) {
        this.buscarUsuario(id);
      } else {
        this.erro = "id inválido";
        this.carregando = false;
        // Força atualizar a tela, pq antes só ficava no carregando
        this.cdr.detectChanges();
      }
    });
  }

  buscarUsuario(id: number) {
    // ele faz o componente responder quando o valor da url é alterado
    this.userService.buscarUsuarioPorId(id).subscribe({
      // Se der tudo certo e funcionar
      next: (dados) => {
        this.user = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      // Se der errado
      error: () => {
        this.erro = "Usuario não encontrado :(";
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }
}