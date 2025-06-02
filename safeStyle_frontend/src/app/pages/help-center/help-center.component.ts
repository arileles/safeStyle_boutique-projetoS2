import { Component, OnInit } from "@angular/core";

declare var google: any;

interface SupportCenter {
  name: string;
  address: string;
  location: { lat: number; lng: number };
  // distance?: number; // Você pode adicionar depois se implementar cálculo
  // phone?: string;   // Você pode adicionar depois se implementar getDetails
}

@Component({
  selector: "app-help-center",
  templateUrl: "./help-center.component.html",
  styleUrls: ["./help-center.component.css"],
})
export class HelpCenterComponent implements OnInit {
  supportCenters: SupportCenter[] = [];
  hasLocation = false;
  isLoading = false;
  errorMessage = "";

  emergencyNumbers = [
    { name: "Polícia", number: "190" },
    { name: "Bombeiros", number: "193" },
    { name: "SAMU", number: "192" },
    { name: "Central de Atendimento à Mulher", number: "180" },
    { name: "Disque Direitos Humanos", number: "100" },
  ];

  ngOnInit(): void {
    // Inicialmente não temos localização
  }

  requestLocation(): void {
    this.isLoading = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.hasLocation = true;
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.buscarCentrosAjuda(lat, lng);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = "Não foi possível acessar sua localização.";
      }
    );
  }

  buscarCentrosAjuda(lat: number, lng: number) {
    if (!google || !google.maps || !google.maps.places) {
      this.isLoading = false;
      this.errorMessage = "Google Maps API não está carregada.";
      return;
    }

    const service = new google.maps.places.PlacesService(document.createElement("div"));

    const request = {
      location: new google.maps.LatLng(lat, lng),
      radius: 5000, // 5 km
      keyword: "apoio mulher",
    };

    service.nearbySearch(request, (results: any[], status: any) => {
      this.isLoading = false;

      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.supportCenters = results.map((place) => ({
          name: place.name,
          address: place.vicinity,
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          // phone e distance podem ser adicionados futuramente aqui
        }));
        this.errorMessage = "";
      } else {
        this.errorMessage = "Não foi possível encontrar centros de apoio próximos.";
        this.supportCenters = [];
      }
    });
  }
}
