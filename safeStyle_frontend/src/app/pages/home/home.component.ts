import { Component,  OnInit } from "@angular/core"
import  { Router } from "@angular/router"
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
  errorMessage = ""

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProdutos()
  }

  loadProdutos(): void {
    this.loading = true
    this.error = false
    this.errorMessage = ""

    this.produtoService.listarTodos().subscribe({
      next: (data) => {
        this.produtos = data || []
        this.loading = false

        // If we got data but it's empty, show a message
        if (this.produtos.length === 0) {
          this.errorMessage = "Nenhum produto encontrado."
        }
      },
      error: (error) => {
        console.error("Error loading products:", error)
        this.loading = false
        this.error = true
        this.errorMessage = "Não foi possível carregar os produtos. Exibindo produtos de exemplo."

        // Fallback to mock data
        this.produtos = this.produtoService.getMockProdutos()
      },
    })
  }

  addToCart(produto: Produto): void {
    this.carrinhoService.addToCart(produto)
  }

  navigateToCategory(category: string): void {
    this.router.navigate(["/category", category])
  }

  retryLoadProducts(): void {
    this.loadProdutos()
  }

  getProductImage(produto: Produto): string {
    // If the product has a valid image URL, use it
    if (produto.imagemUrl && !produto.imagemUrl.includes("placeholder.svg")) {
      return produto.imagemUrl
    }

    // Otherwise, try to use a category-based image
    const categoryImages: { [key: string]: string } = {
      vestido: "/assets/moda_feminina.jpg",
      blusa: "/assets/moda_feminina.jpg",
      colar: "/assets/joias.jpg",
      brinco: "/assets/joias.jpg",
      pulseira: "/assets/joias.jpg",
      anel: "/assets/joias.jpg",
    }

    // Try to match product name with category
    const productName = produto.nome.toLowerCase()
    for (const [key, image] of Object.entries(categoryImages)) {
      if (productName.includes(key)) {
        return image
      }
    }

    // Default fallback
    return "/assets/moda_feminina.jpg"
  }
}
