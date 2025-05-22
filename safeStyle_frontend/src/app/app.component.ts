import { Component, type OnInit } from "@angular/core"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "SafeStyle"
  showWelcomeModal = false
  showLocationModal = false

  ngOnInit() {
    // Show welcome modal on first visit
    if (!localStorage.getItem("welcomeShown")) {
      setTimeout(() => {
        this.showWelcomeModal = true
        localStorage.setItem("welcomeShown", "true")
      }, 1000)
    }

    // Show location modal after welcome modal is closed
    setTimeout(() => {
      if (!localStorage.getItem("locationShown")) {
        this.showLocationModal = true
        localStorage.setItem("locationShown", "true")
      }
    }, 3000)
  }

  closeWelcomeModal() {
    this.showWelcomeModal = false
  }

  closeLocationModal() {
    this.showLocationModal = false
  }
}
