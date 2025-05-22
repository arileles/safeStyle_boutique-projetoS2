import { Component, EventEmitter, Input, Output } from "@angular/core"

@Component({
  selector: "app-error-modal",
  templateUrl: "./error-modal.component.html",
  styleUrls: ["./error-modal.component.css"],
})
export class ErrorModalComponent {
  @Input() message = ""
  @Output() close = new EventEmitter<void>()

  closeModal(): void {
    this.close.emit()
  }
}
