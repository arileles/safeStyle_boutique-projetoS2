export interface Produto {
  id?: number
  nome: string
  descricao: string
  preco: number
  imagemUrl: string
}

export interface ProdutoDto {
  nome: string
  descricao: string
  preco: number
  imagemUrl: string
}
