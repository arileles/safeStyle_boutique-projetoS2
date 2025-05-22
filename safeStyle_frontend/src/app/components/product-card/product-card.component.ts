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
}
