import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
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
import { ProductListComponent } from "./components/product-list/product-list.component"
import { ProductCardComponent } from "./components/product-card/product-card.component"
import { ErrorModalComponent } from "./components/error-modal/error-modal.component"

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
    ProductListComponent,
    ProductCardComponent,
    ErrorModalComponent,
  ],
  imports: [
    BrowserModule,
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
