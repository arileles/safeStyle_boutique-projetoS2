import { Component, type OnInit } from "@angular/core"
import  { ActivatedRoute } from "@angular/router"
import  { ProdutoService } from "../../services/produto.service"
import  { CarrinhoService } from "../../services/carrinho.service"
import  { Produto } from "../../models/produto.model"
import  { ProductFilter } from "../../components/product-filter/product-filter.component"

export interface CategoryBanner {
  title: string
  subtitle: string
  backgroundImage: string
  backgroundColor: string
}

@Component({
  selector: "app-category",
  templateUrl: "./categorys.component.html",
  styleUrls: ["./categorys.component.css"],
})
export class CategoryComponent implements OnInit {
  categoryType = ""
  categoryTitle = ""
  categoryBanner: CategoryBanner = {
    title: "",
    subtitle: "",
    backgroundImage: "",
    backgroundColor: "",
  }
  produtos: Produto[] = []
  filteredProdutos: Produto[] = []
  loading = true
  searchTerm = ""
  sortBy = "relevance"
  error = false
  errorMessage = ""

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryType = params["type"] || ""
      this.setCategoryInfo()
      this.loadProdutos()
    })
  }

  setCategoryInfo(): void {
    const categoryInfo: { [key: string]: CategoryBanner } = {
      feminino: {
        title: "Moda Feminina",
        subtitle: "Descubra sua elegância natural",
        backgroundImage: "/assets/moda_feminina.jpg",
        backgroundColor: "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 50%, #e1bee7 100%)",
      },
      acessorios: {
        title: "Acessórios & Joias",
        subtitle: "Complete seu look com estilo",
        backgroundImage: "/assets/joias.jpg",
        backgroundColor: "linear-gradient(135deg, #fff3e0 0%, #ffcc02 50%, #ff9800 100%)",
      },
    }

    this.categoryBanner = categoryInfo[this.categoryType] || {
      title: "Produtos",
      subtitle: "Encontre o que você procura",
      backgroundImage: "/assets/moda_feminina.jpg",
      backgroundColor: "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 50%, #e1bee7 100%)",
    }
    this.categoryTitle = this.categoryBanner.title
  }

  loadProdutos(): void {
    this.loading = true
    this.error = false
    this.errorMessage = ""

    this.produtoService.listarTodos().subscribe({
      next: (data) => {
        this.produtos = data || []
        this.filteredProdutos = [...this.produtos]
        this.loading = false

        if (this.produtos.length === 0) {
          this.errorMessage = "Nenhum produto encontrado."
        }
      },
      error: (error) => {
        console.error("Error loading products:", error)
        this.loading = false
        this.error = true
        this.errorMessage = "Não foi possível carregar os produtos."

        // Fallback to mock data
        this.produtos = this.produtoService.getMockProdutos()
        this.filteredProdutos = [...this.produtos]
      },
    })
  }

  onFiltersChange(filters: ProductFilter): void {
    // Apply filters to products
    this.filteredProdutos = this.produtos.filter((produto) => {
      // Search filter
      if (this.searchTerm && !produto.nome.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        return false
      }

      // Price filter
      if (produto.preco < filters.priceRange.min || produto.preco > filters.priceRange.max) {
        return false
      }

      return true
    })

    this.sortProducts()
  }

  onSearchChange(): void {
    this.filteredProdutos = this.produtos.filter((produto) => {
      if (this.searchTerm && !produto.nome.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        return false
      }
      return true
    })
    this.sortProducts()
  }

  onSortChange(): void {
    this.sortProducts()
  }

  sortProducts(): void {
    switch (this.sortBy) {
      case "price-low":
        this.filteredProdutos.sort((a, b) => a.preco - b.preco)
        break
      case "price-high":
        this.filteredProdutos.sort((a, b) => b.preco - a.preco)
        break
      case "name":
        this.filteredProdutos.sort((a, b) => a.nome.localeCompare(b.nome))
        break
      default:
        break
    }
  }

  addToCart(produto: Produto): void {
    this.carrinhoService.addToCart(produto)
  }

  retryLoadProducts(): void {
    this.loadProdutos()
  }

  getProductImage(produto: Produto): string {
    if (produto.imagemUrl && !produto.imagemUrl.includes("placeholder.svg")) {
      return produto.imagemUrl
    }

    const productName = produto.nome.toLowerCase()
    if (
      productName.includes("colar") ||
      productName.includes("brinco") ||
      productName.includes("pulseira") ||
      productName.includes("anel") ||
      productName.includes("relógio") ||
      productName.includes("bolsa")
    ) {
      return "/assets/joias.jpg"
    } else {
      return "/assets/moda_feminina.jpg"
    }
  }
}
