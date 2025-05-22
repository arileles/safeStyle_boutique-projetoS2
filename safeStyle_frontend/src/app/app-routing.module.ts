import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { HomeComponent } from "./pages/home/home.component"
import { CartComponent } from "./pages/cart/cart.component"
import { LoginComponent } from "./pages/login/login.component"
import { RegisterComponent } from "./pages/register/register.component"
import { HelpCenterComponent } from "./pages/help-center/help-center.component"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "cart", component: CartComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "help", component: HelpCenterComponent },
  // Hidden route for help center - not in main navigation
  { path: "support-center", component: HelpCenterComponent },
  { path: "**", redirectTo: "" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
