import { Component, Input, Output, EventEmitter } from "@angular/core"
import type { Produto } from "../../models/produto.model"

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent {
  @Input() produtos: Produto[] = []
  @Output() addToCart = new EventEmitter<Produto>()

  onAddToCart(produto: Produto): void {
    this.addToCart.emit(produto)
  }
}
