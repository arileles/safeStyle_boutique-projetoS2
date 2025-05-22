import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import  { Observable } from "rxjs"
import  { Produto, ProdutoDto } from "../models/produto.model"

@Injectable({
  providedIn: "root",
})
export class ProdutoService {
  private apiUrl = "http://localhost:8080/produtos"

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl)
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`)
  }

  criar(produto: ProdutoDto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto)
  }

  atualizar(id: number, produto: ProdutoDto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto)
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  // Mock products for initial display if API is not available
  getMockProdutos(): Produto[] {
    return [
      {
        id: 1,
        nome: "Camiseta Básica",
        descricao: "Camiseta de algodão de alta qualidade",
        preco: 49.9,
        imagemUrl: "assets/images/camiseta-basica.jpg",
      },
      {
        id: 2,
        nome: "Vestido Floral",
        descricao: "Vestido leve com estampa floral",
        preco: 89.9,
        imagemUrl: "assets/images/vestido-floral.jpg",
      },
      {
        id: 3,
        nome: "Calça Jeans",
        descricao: "Calça jeans com lavagem moderna",
        preco: 119.9,
        imagemUrl: "assets/images/calca-jeans.jpg",
      },
      {
        id: 4,
        nome: "Blusa de Moletom",
        descricao: "Blusa de moletom quentinha para o inverno",
        preco: 99.9,
        imagemUrl: "assets/images/moletom.jpg",
      },
      {
        id: 5,
        nome: "Jaqueta de Couro",
        descricao: "Jaqueta de couro sintético",
        preco: 199.9,
        imagemUrl: "assets/images/jaqueta.jpg",
      },
      {
        id: 6,
        nome: "Saia Midi",
        descricao: "Saia midi plissada",
        preco: 79.9,
        imagemUrl: "assets/images/saia.jpg",
      },
    ]
  }
}
