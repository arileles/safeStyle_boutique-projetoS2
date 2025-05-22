import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { Denuncia } from "../models/denuncia.model"

@Injectable({
  providedIn: "root",
})
export class DenunciaService {
  private apiUrl = "http://localhost:8080/denuncias"

  constructor(private http: HttpClient) {}

  enviarDenuncia(denuncia: Denuncia): Observable<Denuncia> {
    return this.http.post<Denuncia>(this.apiUrl, denuncia)
  }

  listarPorUsuario(usuarioId: number): Observable<Denuncia[]> {
    return this.http.get<Denuncia[]>(`${this.apiUrl}/minhas?usuario_id=${usuarioId}`)
  }

  listarTodasDenuncias(): Observable<Denuncia[]> {
    return this.http.get<Denuncia[]>(this.apiUrl)
  }
}
