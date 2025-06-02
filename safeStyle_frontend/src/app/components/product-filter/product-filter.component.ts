import { Component, Input, Output, EventEmitter, type OnInit } from "@angular/core"

export interface ProductFilter {
  products: string[]
  sizes: string[]
  delivery: string
  inStock: boolean
  ratings: number[]
  priceRange: { min: number; max: number }
  colors: string[]
}

@Component({
  selector: "app-product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.css"],
})
export class ProductFilterComponent implements OnInit {
  @Input() categoryType = ""
  @Output() filtersChange = new EventEmitter<ProductFilter>()

  // Products filter
  productTypes = [
    { id: "all", label: "All", checked: true },
    { id: "blouses", label: "Blouses", checked: false },
    { id: "crop-top", label: "Crop Top", checked: false },
    { id: "t-shirts", label: "T-Shirts", checked: true },
    { id: "skirts", label: "Skirts", checked: true },
  ]

  // Sizes filter
  sizes = [
    { id: "xs", label: "PP", checked: false },
    { id: "s", label: "P", checked: false },
    { id: "m", label: "M", checked: false },
    { id: "l", label: "G", checked: false },
    { id: "xl", label: "GG", checked: false },
  ]

  // Delivery options
  deliveryOptions = [
    { id: "same-day", label: "Mesmo dia", checked: false },
    { id: "next-day", label: "Próximo dia", checked: true },
    { id: "2-5-days", label: "2-5 Dias úteis", checked: false },
  ]
  selectedDelivery = "next-day"

  // Inventory
  onlyInStock = true

  // Ratings
  ratings = [
    { stars: 5, checked: true },
    { stars: 4, checked: true },
    { stars: 3, checked: false },
    { stars: 2, checked: false },
    { stars: 1, checked: false },
  ]

  // Price range
  minPrice = 0
  maxPrice = 1000

  // Colors
  colors = [
    { name: "Pink", value: "#ff69b4", checked: true },
    { name: "Blue", value: "#4169e1", checked: true },
    { name: "Purple", value: "#9370db", checked: false },
    { name: "Red", value: "#dc143c", checked: false },
    { name: "Light Pink", value: "#ffb6c1", checked: false },
    { name: "Green", value: "#32cd32", checked: true },
    { name: "Yellow", value: "#ffd700", checked: false },
    { name: "Orange", value: "#ff8c00", checked: true },
    { name: "Teal", value: "#008080", checked: false },
    { name: "Navy", value: "#000080", checked: false },
    { name: "Lime", value: "#00ff00", checked: false },
    { name: "Maroon", value: "#800000", checked: false },
  ]

  ngOnInit(): void {
    this.emitFilters()
  }

  onProductTypeChange(): void {
    this.emitFilters()
  }

  onSizeChange(): void {
    this.emitFilters()
  }

  onDeliveryChange(): void {
    this.emitFilters()
  }

  onStockChange(): void {
    this.emitFilters()
  }

  onRatingChange(): void {
    this.emitFilters()
  }

  onPriceChange(): void {
    this.emitFilters()
  }

  onColorChange(): void {
    this.emitFilters()
  }

  showAllProducts(): void {
    // Implementation for "Show all" functionality
  }

  showAllSizes(): void {
    // Implementation for "Show all" functionality
  }

  private emitFilters(): void {
    const filters: ProductFilter = {
      products: this.productTypes.filter((p) => p.checked).map((p) => p.id),
      sizes: this.sizes.filter((s) => s.checked).map((s) => s.id),
      delivery: this.selectedDelivery,
      inStock: this.onlyInStock,
      ratings: this.ratings.filter((r) => r.checked).map((r) => r.stars),
      priceRange: { min: this.minPrice, max: this.maxPrice },
      colors: this.colors.filter((c) => c.checked).map((c) => c.value),
    }

    this.filtersChange.emit(filters)
  }

  getStarArray(count: number): number[] {
    return Array(count).fill(0)
  }

  getEmptyStarArray(count: number): number[] {
    return Array(5 - count).fill(0)
  }
}
