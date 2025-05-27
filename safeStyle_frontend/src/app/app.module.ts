import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { CommonModule } from "@angular/common"
import { HttpClientModule } from "@angular/common/http"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { RouterModule } from "@angular/router"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { HeaderComponent } from "./components/header/header.component"
import { FooterComponent } from "./components/footer/footer.component"
import { ChatbotComponent } from "./components/chatbot/chatbot.component"
import { WelcomeModalComponent } from "./components/welcome-modal/welcome-modal.component"
import { LocationModalComponent } from "./components/location-modal/location-modal.component"
import { HomeComponent } from "./pages/home/home.component"
import { CartComponent } from "./pages/cart/cart.component"
import { LoginComponent } from "./pages/login/login.component"
import { RegisterComponent } from "./pages/register/register.component"
import { HelpCenterComponent } from "./pages/help-center/help-center.component"
import { CategoryComponent } from "./pages/categorys/categorys.component"
import { ProductListComponent } from "./components/product-list/product-list.component"
import { ProductCardComponent } from "./components/product-card/product-card.component"
import { ErrorModalComponent } from "./components/error-modal/error-modal.component"
import { ProductFilterComponent } from "./components/product-filter/product-filter.component"

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChatbotComponent,
    WelcomeModalComponent,
    LocationModalComponent,
    HomeComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    HelpCenterComponent,
    CategoryComponent,
    ProductListComponent,
    ProductCardComponent,
    ErrorModalComponent,
    ProductFilterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
