import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { HomeComponent } from "./pages/home/home.component"
import { CartComponent } from "./pages/cart/cart.component"
import { LoginComponent } from "./pages/login/login.component"
import { RegisterComponent } from "./pages/register/register.component"
import { HelpCenterComponent } from "./pages/help-center/help-center.component"
import { CategoryComponent } from "./pages/categorys/categorys.component"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "cart", component: CartComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  // Only allow feminino and acessorios categories
  { path: "category/feminino", component: CategoryComponent },
  { path: "category/acessorios", component: CategoryComponent },
  // Redirect any other category attempts to home
  { path: "category/:type", redirectTo: "" },
  // Hidden route for help center - not in main navigation
  { path: "help", component: HelpCenterComponent },
  { path: "support-center", component: HelpCenterComponent },
  { path: "**", redirectTo: "" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
