import { Component, Input, Output, EventEmitter } from "@angular/core"
import type { Produto } from "../../models/produto.model"

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent {
  @Input() produto!: Produto
  @Output() addToCart = new EventEmitter<Produto>()

  onAddToCart(): void {
    this.addToCart.emit(this.produto)
  }

  getImageSrc(): string {
    // If the product has a valid image URL and it's not a placeholder, use it
    if (this.produto.imagemUrl && !this.produto.imagemUrl.includes("placeholder.svg")) {
      return this.produto.imagemUrl
    }

    // Default fallback to a category-based image
    const productName = this.produto.nome.toLowerCase()
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
