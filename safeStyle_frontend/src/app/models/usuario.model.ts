export interface Usuario {
  id?: number
  nome: string
  email: string
  senha?: string
}

export interface UsuarioDto {
  nome: string
  email: string
  senha: string
}
