import { Component,  OnInit } from "@angular/core"
import  { Router } from "@angular/router"
import  { UsuarioService } from "../../services/usuario.service"
import  { CarrinhoService } from "../../services/carrinho.service"
import  { Observable } from "rxjs"
import  { Usuario } from "../../models/usuario.model"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  currentUser$: Observable<Usuario | null>
  cartItemCount = 0
  isMenuOpen = false

  constructor(
    private usuarioService: UsuarioService,
    private carrinhoService: CarrinhoService,
    private router: Router,
  ) {
    this.currentUser$ = this.usuarioService.currentUser$
  }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe((cart) => {
      if (cart) {
        this.cartItemCount = cart.itens.reduce((total: number, item: any) => total + item.quantidade, 0)
      } else {
        this.cartItemCount = 0
      }
    })
  }

  logout(): void {
    this.usuarioService.logout()
    this.router.navigate(["/"])
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen
  }
}
