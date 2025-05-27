import { Component, Input, Output, EventEmitter, type OnInit } from "@angular/core"

export interface ProductFilter {
  categories: string[]
  sizes: string[]
  colors: string[]
  priceRange: { min: number; max: number }
  ratings: number[]
  inStock: boolean
}

@Component({
  selector: "app-product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.css"],
})
export class ProductFilterComponent implements OnInit {
  @Input() categoryType = ""
  @Output() filtersChange = new EventEmitter<ProductFilter>()

  filters: ProductFilter = {
    categories: [],
    sizes: [],
    colors: [],
    priceRange: { min: 0, max: 1000 },
    ratings: [],
    inStock: false,
  }

  // Dynamic product categories based on category type
  get productCategories() {
    const categories: { [key: string]: any[] } = {
      feminino: [
        { id: "all", label: "Todos", checked: true },
        { id: "vestidos", label: "Vestidos", checked: false },
        { id: "blusas", label: "Blusas", checked: false },
        { id: "saias", label: "Saias", checked: false },
        { id: "calcas", label: "Calças", checked: false },
      ],
      acessorios: [
        { id: "all", label: "Todos", checked: true },
        { id: "colares", label: "Colares", checked: false },
        { id: "brincos", label: "Brincos", checked: false },
        { id: "pulseiras", label: "Pulseiras", checked: false },
        { id: "aneis", label: "Anéis", checked: false },
      ],
    }

    return categories[this.categoryType] || categories["feminino"]
  }

  sizes = [
    { id: "xs", label: "X-Small", checked: false },
    { id: "s", label: "Small", checked: false },
    { id: "m", label: "Medium", checked: false },
    { id: "l", label: "Large", checked: false },
    { id: "xl", label: "X-Large", checked: false },
  ]

  deliveryOptions = [
    { id: "same-day", label: "Mesmo dia", checked: false },
    { id: "next-day", label: "Próximo dia", checked: true },
    { id: "2-5-days", label: "2-5 Dias úteis", checked: false },
  ]

  ratings = [
    { stars: 5, checked: true },
    { stars: 4, checked: true },
    { stars: 3, checked: false },
    { stars: 2, checked: false },
    { stars: 1, checked: false },
  ]

  // Dynamic colors based on category
  get colors() {
    const colorsByCategory: { [key: string]: any[] } = {
      feminino: [
        { name: "Pink", value: "#ff69b4", checked: true },
        { name: "Purple", value: "#9c27b0", checked: false },
        { name: "Rose", value: "#f48fb1", checked: true },
        { name: "White", value: "#ffffff", checked: false },
        { name: "Black", value: "#000000", checked: false },
      ],
      acessorios: [
        { name: "Gold", value: "#ffd700", checked: true },
        { name: "Silver", value: "#c0c0c0", checked: true },
        { name: "Rose Gold", value: "#e8b4a0", checked: false },
        { name: "Black", value: "#000000", checked: false },
      ],
    }

    return colorsByCategory[this.categoryType] || colorsByCategory["feminino"]
  }

  inStockOnly = true
  minPrice = 0
  maxPrice = 1000

  ngOnInit(): void {
    this.onFilterChange()
  }

  onFilterChange(): void {
    this.filters = {
      categories: this.productCategories.filter((c) => c.checked).map((c) => c.id),
      sizes: this.sizes.filter((s) => s.checked).map((s) => s.id),
      colors: this.colors.filter((c) => c.checked).map((c) => c.value),
      priceRange: { min: this.minPrice, max: this.maxPrice },
      ratings: this.ratings.filter((r) => r.checked).map((r) => r.stars),
      inStock: this.inStockOnly,
    }

    this.filtersChange.emit(this.filters)
  }

  getStarArray(count: number): number[] {
    return Array(count).fill(0)
  }

  getEmptyStarArray(count: number): number[] {
    return Array(5 - count).fill(0)
  }
}
