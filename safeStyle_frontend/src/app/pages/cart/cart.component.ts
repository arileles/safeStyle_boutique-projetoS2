import { Component, type OnInit } from "@angular/core"
import  { CarrinhoService } from "../../services/carrinho.service"
import  { ItemCarrinho } from "../../models/carrinho.model"
import  { UsuarioService } from "../../services/usuario.service"

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cartItems: ItemCarrinho[] = []
  cartTotal = 0
  isProcessing = false
  errorMessage = ""
  showErrorModal = false

  constructor(
    private carrinhoService: CarrinhoService,
    private usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.loadCart()
  }

  loadCart(): void {
    this.cartItems = this.carrinhoService.getCartItems()
    this.cartTotal = this.carrinhoService.getCartTotal()
  }

  updateQuantity(item: ItemCarrinho, newQuantity: number): void {
    if (newQuantity < 1) newQuantity = 1
    if (newQuantity > 10) newQuantity = 10

    this.carrinhoService.updateQuantity(item.produtoId, newQuantity)
    this.loadCart()
  }

  removeItem(produtoId: number): void {
    this.carrinhoService.removeFromCart(produtoId)
    this.loadCart()
  }

  clearCart(): void {
    this.carrinhoService.clearCart()
    this.loadCart()
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      this.errorMessage = "Seu carrinho está vazio. Adicione produtos antes de finalizar a compra."
      this.showErrorModal = true
      return
    }

    if (!this.usuarioService.isLoggedIn()) {
      this.errorMessage = "Por favor, faça login para finalizar sua compra."
      this.showErrorModal = true
      return
    }

    this.isProcessing = true

    // Simulate processing delay
    setTimeout(() => {
      this.carrinhoService.checkout().subscribe({
        next: (response) => {
          this.isProcessing = false
          if (!response.success) {
            this.errorMessage = response.message
            this.showErrorModal = true
          }
        },
        error: (error) => {
          this.isProcessing = false
          this.errorMessage = "Ocorreu um erro ao processar seu pedido. Por favor, tente novamente mais tarde."
          this.showErrorModal = true
        },
      })
    }, 2000)
  }

  closeErrorModal(): void {
    this.showErrorModal = false
  }
}
