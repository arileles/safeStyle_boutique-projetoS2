import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { BehaviorSubject,  Observable, of } from "rxjs"
import  { Carrinho, ItemCarrinho } from "../models/carrinho.model"
import  { Produto } from "../models/produto.model"

@Injectable({
  providedIn: "root",
})
export class CarrinhoService {
  private apiUrl = "http://localhost:8080/carrinho"
  private carrinhoSubject = new BehaviorSubject<Carrinho | null>(null)
  public carrinho$ = this.carrinhoSubject.asObservable()

  // Local cart for users not logged in
  private localCart: ItemCarrinho[] = []

  constructor(private http: HttpClient) {
    // Load cart from localStorage
    const storedCart = localStorage.getItem("localCart")
    if (storedCart) {
      this.localCart = JSON.parse(storedCart)
      this.updateLocalCart()
    }
  }

  listarTodos(): Observable<Carrinho[]> {
    return this.http.get<Carrinho[]>(this.apiUrl)
  }

  buscarPorId(id: number): Observable<Carrinho> {
    return this.http.get<Carrinho>(`${this.apiUrl}/${id}`)
  }

  salvar(carrinho: Carrinho): Observable<Carrinho> {
    return this.http.post<Carrinho>(this.apiUrl, carrinho)
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  // Methods for managing local cart
  addToCart(produto: Produto, quantidade = 1): void {
    const existingItem = this.localCart.find((item) => item.produtoId === produto.id)

    if (existingItem) {
      existingItem.quantidade += quantidade
    } else {
      this.localCart.push({
        produtoId: produto.id!,
        quantidade: quantidade,
        produto: produto,
      })
    }

    this.updateLocalCart()
  }

  removeFromCart(produtoId: number): void {
    this.localCart = this.localCart.filter((item) => item.produtoId !== produtoId)
    this.updateLocalCart()
  }

  updateQuantity(produtoId: number, quantidade: number): void {
    const item = this.localCart.find((item) => item.produtoId === produtoId)
    if (item) {
      item.quantidade = quantidade
      this.updateLocalCart()
    }
  }

  clearCart(): void {
    this.localCart = []
    this.updateLocalCart()
  }

  private updateLocalCart(): void {
    localStorage.setItem("localCart", JSON.stringify(this.localCart))

    // Calculate total value
    let valorTotal = 0
    this.localCart.forEach((item) => {
      if (item.produto) {
        valorTotal += item.produto.preco * item.quantidade
      }
    })

    // Update the BehaviorSubject
    this.carrinhoSubject.next({
      itens: this.localCart,
      usuarioId: 0, // Placeholder for guest users
      valorTotal: valorTotal,
    })
  }

  getCartItems(): ItemCarrinho[] {
    return this.localCart
  }

  getCartItemCount(): number {
    return this.localCart.reduce((total, item) => total + item.quantidade, 0)
  }

  getCartTotal(): number {
    return this.localCart.reduce((total, item) => {
      if (item.produto) {
        return total + item.produto.preco * item.quantidade
      }
      return total
    }, 0)
  }

  // Method to simulate checkout failure
  checkout(): Observable<{ success: boolean; message: string }> {
    // Always return failure as per requirements
    return of({
      success: false,
      message:
        "Não foi possível processar seu pagamento. Por favor, tente novamente mais tarde ou entre em contato com o suporte.",
    })
  }
}
