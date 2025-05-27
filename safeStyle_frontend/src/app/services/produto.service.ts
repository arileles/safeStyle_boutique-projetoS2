import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import {  Observable, of, throwError } from "rxjs"
import { catchError, timeout } from "rxjs/operators"
import  { Produto, ProdutoDto } from "../models/produto.model"

@Injectable({
  providedIn: "root",
})
export class ProdutoService {
  private apiUrl = "http://localhost:8080/produtos"
  private readonly REQUEST_TIMEOUT = 5000 // 5 seconds timeout

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl).pipe(
      timeout(this.REQUEST_TIMEOUT),
      catchError((error) => {
        console.warn("API not available, using mock data:", error)
        // Return mock data instead of throwing error
        return of(this.getMockProdutos())
      }),
    )
  }

  listarPorCategoria(categoria: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/categoria/${categoria}`).pipe(
      timeout(this.REQUEST_TIMEOUT),
      catchError((error) => {
        console.warn("API not available, using mock data for category:", categoria, error)
        // Return category-specific mock data
        return of(this.getMockProdutosByCategory(categoria))
      }),
    )
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`).pipe(
      timeout(this.REQUEST_TIMEOUT),
      catchError((error) => {
        console.warn("API not available for product ID:", id, error)
        const mockProduct = this.getMockProdutos().find((p) => p.id === id)
        if (mockProduct) {
          return of(mockProduct)
        }
        return throwError(() => new Error("Product not found"))
      }),
    )
  }

  criar(produto: ProdutoDto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto).pipe(
      timeout(this.REQUEST_TIMEOUT),
      catchError((error) => {
        console.error("Failed to create product:", error)
        return throwError(() => new Error("Failed to create product"))
      }),
    )
  }

  atualizar(id: number, produto: ProdutoDto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto).pipe(
      timeout(this.REQUEST_TIMEOUT),
      catchError((error) => {
        console.error("Failed to update product:", error)
        return throwError(() => new Error("Failed to update product"))
      }),
    )
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      timeout(this.REQUEST_TIMEOUT),
      catchError((error) => {
        console.error("Failed to delete product:", error)
        return throwError(() => new Error("Failed to delete product"))
      }),
    )
  }

  // Mock products for initial display if API is not available
  getMockProdutos(): Produto[] {
    return [
      {
        id: 1,
        nome: "Vestido Floral Primavera",
        descricao: "Vestido leve com estampa floral delicada, perfeito para o dia a dia",
        preco: 129.9,
        imagemUrl: "/assets/moda_feminina.jpg",
      },
      {
        id: 2,
        nome: "Colar Delicado Dourado",
        descricao: "Colar delicado em ouro 18k com pingente em formato de coração",
        preco: 299.9,
        imagemUrl: "/assets/joias.jpg",
      },
      {
        id: 3,
        nome: "Blusa Cropped Elegante",
        descricao: "Blusa cropped em tecido premium com acabamento refinado",
        preco: 89.9,
        imagemUrl: "/assets/moda_feminina.jpg",
      },
      {
        id: 4,
        nome: "Brincos Pérola Clássicos",
        descricao: "Brincos de pérola natural com acabamento em ouro branco",
        preco: 189.9,
        imagemUrl: "/assets/joias.jpg",
      },
    ]
  }

  // Category-specific products
  getMockProdutosByCategory(category: string): Produto[] {
    const allProducts = {
      feminino: [
        {
          id: 1,
          nome: "Vestido Floral Primavera",
          descricao: "Vestido leve com estampa floral delicada, perfeito para o dia a dia",
          preco: 129.9,
          imagemUrl: "/assets/moda_feminina.jpg",
        },
        {
          id: 2,
          nome: "Blusa Cropped Elegante",
          descricao: "Blusa cropped em tecido premium com acabamento refinado",
          preco: 89.9,
          imagemUrl: "/assets/moda_feminina.jpg",
        },
        {
          id: 3,
          nome: "Saia Midi Plissada",
          descricao: "Saia midi plissada em tecido fluido, ideal para ocasiões especiais",
          preco: 99.9,
          imagemUrl: "/assets/moda_feminina.jpg",
        },
        {
          id: 4,
          nome: "Cardigan Oversized",
          descricao: "Cardigan oversized confortável e estiloso para os dias mais frios",
          preco: 149.9,
          imagemUrl: "/assets/moda_feminina.jpg",
        },
        {
          id: 5,
          nome: "Calça Wide Leg Premium",
          descricao: "Calça wide leg de alfaiataria com caimento perfeito",
          preco: 179.9,
          imagemUrl: "/assets/moda_feminina.jpg",
        },
        {
          id: 6,
          nome: "Blazer Feminino Clássico",
          descricao: "Blazer feminino clássico para um look profissional e elegante",
          preco: 199.9,
          imagemUrl: "/assets/moda_feminina.jpg",
        },
      ],
      acessorios: [
        {
          id: 7,
          nome: "Colar Delicado Dourado",
          descricao: "Colar delicado em ouro 18k com pingente em formato de coração",
          preco: 299.9,
          imagemUrl: "/assets/joias.jpg",
        },
        {
          id: 8,
          nome: "Brincos Pérola Clássicos",
          descricao: "Brincos de pérola natural com acabamento em ouro branco",
          preco: 189.9,
          imagemUrl: "/assets/joias.jpg",
        },
        {
          id: 9,
          nome: "Pulseira Charm Personalizada",
          descricao: "Pulseira com charms personalizados em prata 925",
          preco: 159.9,
          imagemUrl: "/assets/joias.jpg",
        },
        {
          id: 10,
          nome: "Anel Solitário Elegante",
          descricao: "Anel solitário com zircônia cúbica em ouro 18k",
          preco: 399.9,
          imagemUrl: "/assets/joias.jpg",
        },
        {
          id: 11,
          nome: "Relógio Feminino Luxo",
          descricao: "Relógio feminino com pulseira em couro e detalhes dourados",
          preco: 599.9,
          imagemUrl: "/assets/joias.jpg",
        },
        {
          id: 12,
          nome: "Bolsa Pequena Elegante",
          descricao: "Bolsa pequena em couro legítimo com alça removível",
          preco: 229.9,
          imagemUrl: "/assets/joias.jpg",
        },
      ],
    }

    return allProducts[category as keyof typeof allProducts] || []
  }
}
