import { Component } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import  { Router } from "@angular/router"
import  { UsuarioService } from "../../services/usuario.service"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm: FormGroup
  errorMessage = ""
  isLoading = false

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return
    }

    this.isLoading = true
    this.errorMessage = ""

    const { email, senha } = this.loginForm.value

    this.usuarioService.login(email, senha).subscribe({
      next: () => {
        this.isLoading = false
        this.router.navigate(["/"])
      },
      error: (error) => {
        this.isLoading = false
        this.errorMessage = error.message || "Falha no login. Verifique suas credenciais."
      },
    })
  }
}
