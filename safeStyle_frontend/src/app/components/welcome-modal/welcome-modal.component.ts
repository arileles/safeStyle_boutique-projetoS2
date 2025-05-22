import { Component, EventEmitter, Output } from "@angular/core"

@Component({
  selector: "app-welcome-modal",
  templateUrl: "./welcome-modal.component.html",
  styleUrls: ["./welcome-modal.component.css"],
})
export class WelcomeModalComponent {
  @Output() close = new EventEmitter<void>()

  closeModal(): void {
    this.close.emit()
  }
}
