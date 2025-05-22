export interface ItemCarrinho {
  produtoId: number
  quantidade: number
  produto?: any // For display purposes
}

export interface Carrinho {
  id?: number
  itens: ItemCarrinho[]
  usuarioId: number
  valorTotal: number
}
