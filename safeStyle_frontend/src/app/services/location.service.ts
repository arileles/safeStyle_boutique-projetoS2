import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable, of } from "rxjs"

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
    // In a real app, this would call an API with the user's location
    // For now, we'll return mock data
    return of([
      {
        id: 1,
        name: "Centro de Apoio à Mulher",
        address: "Rua das Flores, 123",
        phone: "(11) 3333-4444",
        distance: "2.3 km",
        latitude: -23.5505,
        longitude: -46.6333,
      },
      {
        id: 2,
        name: "Delegacia da Mulher",
        address: "Av. Paulista, 1000",
        phone: "(11) 3333-5555",
        distance: "3.7 km",
        latitude: -23.5632,
        longitude: -46.6541,
      },
      {
        id: 3,
        name: "Casa Abrigo",
        address: "Rua Segura, 789",
        phone: "(11) 3333-6666",
        distance: "5.1 km",
        latitude: -23.58,
        longitude: -46.64,
      },
    ])
  }
}
