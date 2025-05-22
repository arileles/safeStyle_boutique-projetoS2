import { Component } from "@angular/core"
import  { Router } from "@angular/router"

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear()

  constructor(private router: Router) {}

  navigateToHelp(): void {
    // Hidden route to help center
    this.router.navigate(["/support-center"])
  }
}
