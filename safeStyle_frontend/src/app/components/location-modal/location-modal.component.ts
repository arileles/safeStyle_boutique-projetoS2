import { Component, EventEmitter, Output } from "@angular/core"
import  { LocationService } from "../../services/location.service"

@Component({
  selector: "app-location-modal",
  templateUrl: "./location-modal.component.html",
  styleUrls: ["./location-modal.component.css"],
})
export class LocationModalComponent {
  @Output() close = new EventEmitter<void>()
  isLoading = false
  errorMessage = ""

  constructor(private locationService: LocationService) {}

  allowLocation(): void {
    this.isLoading = true
    this.errorMessage = ""

    this.locationService
      .requestLocation()
      .then(() => {
        this.isLoading = false
        this.close.emit()
      })
      .catch((error) => {
        this.isLoading = false
        this.errorMessage =
          "Não foi possível acessar sua localização. Por favor, verifique as permissões do seu navegador."
        console.error("Location error:", error)
      })
  }

  denyLocation(): void {
    this.close.emit()
  }
}
