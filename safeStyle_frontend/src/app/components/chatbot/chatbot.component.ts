import { Component, type OnInit, ViewChild, type ElementRef, type AfterViewChecked } from "@angular/core"
import  { ChatbotService, ChatMessage } from "../../services/chatbot.service"
import  { Router } from "@angular/router"

@Component({
  selector: "app-chatbot",
  templateUrl: "./chatbot.component.html",
  styleUrls: ["./chatbot.component.css"],
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild("chatMessages") private messagesContainer!: ElementRef

  messages: ChatMessage[] = []
  newMessage = ""
  isChatOpen = false
  unreadMessages = 0

  constructor(
    private chatbotService: ChatbotService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.chatbotService.messages$.subscribe((messages) => {
      this.messages = messages

      // If new message and chat is closed, increment unread count
      if (messages.length > 0 && !this.isChatOpen && messages[messages.length - 1].sender === "bot") {
        this.unreadMessages++
      }
    })

    // Initialize the chat with welcome message
    this.chatbotService.initChat()
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom()
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen

    if (this.isChatOpen) {
      this.unreadMessages = 0
      setTimeout(() => {
        this.scrollToBottom()
      }, 100)
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim() === "") return

    this.chatbotService.sendMessage(this.newMessage)
    this.newMessage = ""
  }

  selectOption(option: string): void {
    this.chatbotService.sendMessage(option)
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.sendMessage()
    }
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight
    } catch (err) {}
  }

  navigateToLogin(): void {
    this.router.navigate(["/login"])
    this.toggleChat()
  }

  navigateToRegister(): void {
    this.router.navigate(["/register"])
    this.toggleChat()
  }
}
