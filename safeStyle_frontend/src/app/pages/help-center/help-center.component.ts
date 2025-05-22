import { Component, type OnInit } from "@angular/core"
import  { LocationService, SupportCenter } from "../../services/location.service"

@Component({
  selector: "app-help-center",
  templateUrl: "./help-center.component.html",
  styleUrls: ["./help-center.component.css"],
})
export class HelpCenterComponent implements OnInit {
  supportCenters: SupportCenter[] = []
  hasLocation = false
  isLoading = true
  emergencyNumbers = [
    { name: "Polícia", number: "190" },
    { name: "Bombeiros", number: "193" },
    { name: "SAMU", number: "192" },
    { name: "Central de Atendimento à Mulher", number: "180" },
    { name: "Disque Direitos Humanos", number: "100" },
  ]

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.hasLocation = this.locationService.hasLocationPermission()

    if (this.hasLocation) {
      this.loadSupportCenters()
    } else {
      this.isLoading = false
    }
  }

  loadSupportCenters(): void {
    this.locationService.getNearbySupports().subscribe({
      next: (centers) => {
        this.supportCenters = centers
        this.isLoading = false
      },
      error: () => {
        this.isLoading = false
      },
    })
  }

  requestLocation(): void {
    this.isLoading = true
    this.locationService
      .requestLocation()
      .then(() => {
        this.hasLocation = true
        this.loadSupportCenters()
      })
      .catch(() => {
        this.isLoading = false
      })
  }
}
