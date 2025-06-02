import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, of } from "rxjs"
import { map } from "rxjs/operators"; // certifique-se de importar isso no topo


export interface SupportCenter {
  id: number
  name: string
  address: string
  phone: string
  distance: string
  latitude: number
  longitude: number
}

@Injectable({
  providedIn: "root",
})
export class LocationService {
  private locationSubject = new BehaviorSubject<GeolocationPosition | null>(null)
  public location$ = this.locationSubject.asObservable()

  constructor() {}

  requestLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocalização não é suportada pelo seu navegador")
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.locationSubject.next(position)
            localStorage.setItem("locationPermission", "granted")
            resolve(position)
          },
          (error) => {
            localStorage.setItem("locationPermission", "denied")
            reject(error)
          },
        )
      }
    })
  }

  hasLocationPermission(): boolean {
    return localStorage.getItem("locationPermission") === "granted"
  }

  // Mock method to get nearby support centers
  getNearbySupports(): Observable<SupportCenter[]> {
    const centers: SupportCenter[] = [
      {
        id: 1,
        name: "Centro de Apoio à Mulher",
        address: "Rua das Flores, 123",
        phone: "(11) 3333-4444",
        distance: "",
        latitude: -23.5505,
        longitude: -46.6333,
      },
      {
        id: 2,
        name: "Delegacia da Mulher",
        address: "Av. Paulista, 1000",
        phone: "(11) 3333-5555",
        distance: "",
        latitude: -23.5632,
        longitude: -46.6541,
      },
      {
        id: 3,
        name: "Casa Abrigo",
        address: "Rua Segura, 789",
        phone: "(11) 3333-6666",
        distance: "",
        latitude: -23.58,
        longitude: -46.64,
      },
    ];
  
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const R = 6371;
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };
  
    return this.location$.pipe(
      map((position) => {
        if (!position) return centers;
  
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        return centers
          .map(center => {
            const dist = calculateDistance(lat, lon, center.latitude, center.longitude);
            return {
              ...center,
              distance: `${dist.toFixed(2)} km`
            };
          })
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      })
    );
  }
}
