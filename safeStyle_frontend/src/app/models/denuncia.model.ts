export interface Denuncia {
  id?: number
  descricao: string
  data: string // LocalDate in ISO format
  hora: string // LocalTime in ISO format
  usuarioId?: number
  dataCriacao?: string // LocalDateTime in ISO format
}
