import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { DenunciaService } from "./denuncia.service"
import { Denuncia } from "../models/denuncia.model"
import { UsuarioService } from "./usuario.service"

export interface ChatMessage {
  sender: "user" | "bot"
  text: string
  timestamp: Date
  options?: string[]
}

@Injectable({
  providedIn: "root",
})
export class ChatbotService {
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([])
  public messages$ = this.messagesSubject.asObservable()

  private currentState: "initial" | "collecting" | "details" | "confirmation" | "complete" = "initial"
  private reportData: any = {
    descricao: "",
    tipo: "",
    detalhes: "",
  }

  private modoDenunciaAtivo: boolean = false

  constructor(
    private denunciaService: DenunciaService,
    private usuarioService: UsuarioService,
  ) {}

  initChat(): void {
    const initialMessages: ChatMessage[] = [
      {
        sender: "bot",
        text: "Olá! Sou o assistente virtual da SafeStyle. Como posso ajudar você hoje?",
        timestamp: new Date(),
        options: [
          "Preciso de ajuda com um pedido",
          "Quero informações sobre produtos",
          "Preciso de ajuda urgente",
          "Outro assunto",
        ],
      },
    ]
    this.messagesSubject.next(initialMessages)
    this.currentState = "initial"
  }

  sendMessage(text: string): void {
    const currentMessages = this.messagesSubject.value
    const userMessage: ChatMessage = {
      sender: "user",
      text: text,
      timestamp: new Date(),
    }

    const updatedMessages = [...currentMessages, userMessage]
    this.messagesSubject.next(updatedMessages)

    // 🚨 Se o modo denúncia automático está ativo, enviar denúncia diretamente
    if (this.modoDenunciaAtivo) {
      this.modoDenunciaAtivo = false
      this.enviarDenunciaAutomatica(text)
      return
    }

    setTimeout(() => {
      this.processMessage(text)
    }, 500)
  }

  private processMessage(text: string): void {
    let response: ChatMessage

    const helpKeywords = ["ajuda", "urgente", "emergência", "socorro", "perigo", "abuso", "violência"]
    const isHelpRequest = helpKeywords.some((keyword) => text.toLowerCase().includes(keyword))

    if (isHelpRequest && this.currentState !== "collecting") {
      this.currentState = "collecting"
      response = {
        sender: "bot",
        text: "Entendi que você precisa de ajuda. Estou aqui para te ouvir e ajudar. Você está em um ambiente seguro para conversar?",
        timestamp: new Date(),
        options: ["Sim, posso falar agora", "Não, preciso ser discreto"],
      }
    } else {
      switch (this.currentState) {
        case "initial":
          if (text.toLowerCase().includes("ajuda urgente") || text.toLowerCase().includes("preciso de ajuda urgente")) {
            this.currentState = "collecting"
            response = {
              sender: "bot",
              text: "Entendi que você precisa de ajuda. Estou aqui para te ouvir e ajudar. Você está em um ambiente seguro para conversar?",
              timestamp: new Date(),
              options: ["Sim, posso falar agora", "Não, preciso ser discreto"],
            }
          } else if (text.toLowerCase().includes("pedido") || text.toLowerCase().includes("compra")) {
            response = {
              sender: "bot",
              text: "Para informações sobre pedidos, você pode verificar seu histórico de compras na sua conta ou entrar em contato com nosso suporte pelo e-mail suporte@safestyle.com",
              timestamp: new Date(),
            }
          } else if (text.toLowerCase().includes("produto") || text.toLowerCase().includes("informações")) {
            response = {
              sender: "bot",
              text: "Temos diversos produtos disponíveis em nossa loja. Você pode navegar pelas categorias no menu principal ou me dizer que tipo de produto está procurando.",
              timestamp: new Date(),
            }
          } else {
            response = {
              sender: "bot",
              text: "Desculpe, não entendi completamente. Como posso ajudar você hoje?",
              timestamp: new Date(),
              options: [
                "Preciso de ajuda com um pedido",
                "Quero informações sobre produtos",
                "Preciso de ajuda urgente",
                "Outro assunto",
              ],
            }
          }
          break

        case "collecting":
          this.reportData.descricao = text
          this.currentState = "details"
          response = {
            sender: "bot",
            text: "Obrigado por compartilhar isso. Suas informações são confidenciais e estão seguras. Você gostaria de fornecer mais detalhes sobre quando isso aconteceu?",
            timestamp: new Date(),
          }
          // Ativa o modo denúncia automática
          this.modoDenunciaAtivo = true
          break

        case "details":
          this.reportData.detalhes = text
          this.currentState = "confirmation"
          response = {
            sender: "bot",
            text: "Entendi. Gostaria de registrar essas informações como um relato confidencial? Isso pode ajudar você a receber o suporte adequado.",
            timestamp: new Date(),
            options: ["Sim, registrar relato", "Não, apenas conversando"],
          }
          break

        case "confirmation":
          if (text.toLowerCase().includes("sim")) {
            if (this.usuarioService.isLoggedIn()) {
              this.submitReport()
              response = {
                sender: "bot",
                text: 'Seu relato foi registrado com segurança. Todas as informações são confidenciais. Se precisar de ajuda imediata, recomendamos entrar em contato com um dos centros de apoio próximos a você. Você pode encontrá-los na seção "Ajuda" do site.',
                timestamp: new Date(),
              }
            } else {
              response = {
                sender: "bot",
                text: "Para registrar seu relato, precisamos que você faça login ou crie uma conta. Isso garante que suas informações sejam protegidas e que possamos oferecer o suporte adequado. Você pode fazer isso agora?",
                timestamp: new Date(),
                options: ["Fazer login", "Criar conta", "Não quero me identificar"],
              }
            }
          } else {
            response = {
              sender: "bot",
              text: 'Tudo bem. Estamos aqui para ajudar quando você precisar. Lembre-se que você pode encontrar informações sobre centros de apoio na seção "Ajuda" do site. Posso ajudar com mais alguma coisa?',
              timestamp: new Date(),
              options: ["Sim, tenho outras dúvidas", "Não, obrigado"],
            }
          }
          this.currentState = "complete"
          break

        case "complete":
          if (text.toLowerCase().includes("sim")) {
            this.currentState = "initial"
            response = {
              sender: "bot",
              text: "Como posso ajudar você hoje?",
              timestamp: new Date(),
              options: [
                "Preciso de ajuda com um pedido",
                "Quero informações sobre produtos",
                "Preciso de ajuda urgente",
                "Outro assunto",
              ],
            }
          } else {
            response = {
              sender: "bot",
              text: "Obrigado por conversar comigo. Se precisar de mais ajuda, estou sempre disponível.",
              timestamp: new Date(),
            }
          }
          break
      }
    }

    const currentMessages = this.messagesSubject.value
    const updatedMessages = [...currentMessages, response]
    this.messagesSubject.next(updatedMessages)
  }

  private enviarDenunciaAutomatica(descricao: string): void {
    const currentUser = this.usuarioService.currentUserValue

    if (currentUser) {
      const today = new Date()
      const formattedDate = today.toISOString().split("T")[0]
      const formattedTime = today.toTimeString().split(" ")[0]

      const denuncia: Denuncia = {
        descricao: descricao,
        data: formattedDate,
        hora: formattedTime,
        usuarioId: currentUser.id!,
      }

      this.denunciaService.enviarDenuncia(denuncia).subscribe({
        next: () => {
          console.log("Denúncia automática enviada com sucesso")
          this.adicionarMensagemBot("Sua denúncia foi registrada com segurança. Se precisar de mais ajuda, estarei por aqui.")
        },
        error: (error) => {
          console.error("Erro ao enviar denúncia automática", error)
          this.adicionarMensagemBot("Houve um problema ao registrar sua denúncia. Por favor, tente novamente mais tarde.")
        },
      })
    } else {
      this.adicionarMensagemBot("Para registrar sua denúncia, por favor, faça login.")
    }
  }

  private adicionarMensagemBot(texto: string): void {
    const botMessage: ChatMessage = {
      sender: "bot",
      text: texto,
      timestamp: new Date(),
    }

    const currentMessages = this.messagesSubject.value
    const updatedMessages = [...currentMessages, botMessage]
    this.messagesSubject.next(updatedMessages)
  }

  private submitReport(): void {
    const currentUser = this.usuarioService.currentUserValue

    if (currentUser) {
      const today = new Date()
      const formattedDate = today.toISOString().split("T")[0]
      const formattedTime = today.toTimeString().split(" ")[0]

      const denuncia: Denuncia = {
        descricao: this.reportData.descricao,
        data: formattedDate,
        hora: formattedTime,
        usuarioId: currentUser.id!,
      }

      this.denunciaService.enviarDenuncia(denuncia).subscribe({
        next: () => {
          console.log("Report submitted successfully")
        },
        error: (error) => {
          console.error("Error submitting report", error)
        },
      })
    }
  }

  clearChat(): void {
    this.messagesSubject.next([])
    this.initChat()
  }
}
