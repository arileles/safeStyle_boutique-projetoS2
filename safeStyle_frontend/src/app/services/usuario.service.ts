import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { BehaviorSubject, type Observable, throwError } from "rxjs"
import { catchError, map, tap } from "rxjs/operators"
import  { Usuario, UsuarioDto } from "../models/usuario.model"

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private apiUrl = "http://localhost:8080/usuarios"
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  constructor(private http: HttpClient) {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser))
    }
  }

  listarTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl)
  }

  criarUsuario(usuario: UsuarioDto): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario).pipe(
      tap((user) => {
        // Store user without password
        const safeUser = { ...user }
        delete safeUser.senha
        this.currentUserSubject.next(safeUser)
        localStorage.setItem("currentUser", JSON.stringify(safeUser))
      }),
    )
  }

  excluirUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  login(email: string, senha: string): Observable<Usuario> {
    // In a real app, you would have a proper login endpoint
    // For now, we'll simulate login by finding the user by email
    return this.listarTodos().pipe(
      map((users) => {
        const user = users.find((u) => u.email === email)
        if (user) {
          // In a real app, password would be verified on the server
          // Here we're just simulating successful login
          const safeUser = { ...user }
          delete safeUser.senha
          this.currentUserSubject.next(safeUser)
          localStorage.setItem("currentUser", JSON.stringify(safeUser))
          return safeUser
        } else {
          throw new Error("Usuário não encontrado")
        }
      }),
      catchError((error) => {
        return throwError(() => new Error("Falha no login. Verifique suas credenciais."))
      }),
    )
  }

  logout(): void {
    localStorage.removeItem("currentUser")
    this.currentUserSubject.next(null)
  }

  get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue
  }
}
