import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent implements OnInit {
  isLoading = false;
  errorMessage: string | null = null;
  isVisible = true; // controla visibilidade do modal

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    const savedLocation = this.getSavedLocation();
    if (savedLocation) {
      console.log('Localização recuperada do armazenamento:', savedLocation);
      this.buscarCentrosAjuda(savedLocation.lat, savedLocation.lng);
      this.closeModal();
    }
  }

  allowLocation() {
    this.isLoading = true;
    this.errorMessage = null;

    if (!navigator.geolocation) {
      this.errorMessage = 'Geolocalização não suportada pelo seu navegador.';
      this.isLoading = false;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.ngZone.run(() => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log('Localização permitida:', lat, lng);

          this.saveLocation(lat, lng);
          this.buscarCentrosAjuda(lat, lng);
          this.isLoading = false;
          this.closeModal();
        });
      },
      (error) => {
        this.ngZone.run(() => {
          this.errorMessage = 'Não foi possível obter sua localização.';
          this.isLoading = false;
        });
      }
    );
  }

  denyLocation() {
    this.closeModal();
  }

  buscarCentrosAjuda(lat: number, lng: number) {
    console.log(`Buscando centros próximos a ${lat}, ${lng}`);
    // implementar chamada real aqui
  }

  closeModal() {
    this.isVisible = false;
  }

  saveLocation(lat: number, lng: number) {
    localStorage.setItem('userLocation', JSON.stringify({ lat, lng }));
  }

  getSavedLocation(): { lat: number; lng: number } | null {
    const loc = localStorage.getItem('userLocation');
    return loc ? JSON.parse(loc) : null;
  }
}
