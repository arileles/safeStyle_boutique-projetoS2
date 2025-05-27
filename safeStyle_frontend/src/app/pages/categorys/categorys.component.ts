import { Component,  OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { ProdutoService } from "../../services/produto.service"
import { CarrinhoService } from "../../services/carrinho.service"
import { Produto } from "../../models/produto.model"
import { ProductFilter } from "../../components/product-filter/product-filter.component"

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

  filters: ProductFilter = {
    categories: [],
    sizes: [],
    colors: [],
    priceRange: { min: 0, max: 1000 },
    ratings: [],
    inStock: false,
  }

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryType = params["type"]
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
      backgroundImage: "",
      backgroundColor: "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 50%, #e1bee7 100%)",
    }
    this.categoryTitle = this.categoryBanner.title
  }

  loadProdutos(): void {
    this.loading = true
    this.error = false
    this.errorMessage = ""

    this.produtoService.listarPorCategoria(this.categoryType).subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        this.filteredProdutos = produtos;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.loading = false;  // ESSENCIAL
        this.error = true;
      }
    });
    
  }

  onFiltersChange(filters: ProductFilter): void {
    this.filters = filters
    this.applyFilters()
  }

  onSearchChange(): void {
    this.applyFilters()
  }

  onSortChange(): void {
    this.sortProducts()
  }

  applyFilters(): void {
    this.filteredProdutos = this.produtos.filter((produto) => {
      // Search filter
      if (this.searchTerm && !produto.nome.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        return false
      }

      // Price filter
      if (produto.preco < this.filters.priceRange.min || produto.preco > this.filters.priceRange.max) {
        return false
      }

      return true
    })

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
        // relevance - keep original order
        break
    }
  }

  addToCart(produto: Produto): void {
    this.carrinhoService.addToCart(produto)
  }

  retryLoadProducts(): void {
    this.loadProdutos()
  }
}
