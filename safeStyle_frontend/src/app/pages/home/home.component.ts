import { Component,  OnInit } from "@angular/core"
import  { ProdutoService } from "../../services/produto.service"
import  { CarrinhoService } from "../../services/carrinho.service"
import  { Produto } from "../../models/produto.model"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  produtos: Produto[] = []
  loading = true
  error = false

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
  ) {}

  ngOnInit(): void {
    this.loadProdutos()
  }

  loadProdutos(): void {
    this.produtoService.listarTodos().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.produtos = data
        } else {
          // If no products from API, use mock data
          this.produtos = this.produtoService.getMockProdutos()
        }
        this.loading = false
      },
      error: (error) => {
        console.error("Error loading products", error)
        // On error, use mock data
        this.produtos = this.produtoService.getMockProdutos()
        this.loading = false
        this.error = true
      },
    })
  }

  addToCart(produto: Produto): void {
    this.carrinhoService.addToCart(produto)
  }
}
