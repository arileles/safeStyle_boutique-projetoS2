import { Component } from "@angular/core"
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { UsuarioService } from "../../services/usuario.service"
import { UsuarioDto } from "../../models/usuario.model"

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  registerForm: FormGroup
  errorMessage = ""
  isLoading = false

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group(
      {
        nome: ["", [Validators.required, Validators.minLength(3)]],
        email: ["", [Validators.required, Validators.email]],
        senha: ["", [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ["", [Validators.required]],
      },
      { validator: this.checkPasswords },
    )
  }

  checkPasswords(group: FormGroup) {
    const senha = group.get("senha")?.value
    const confirmarSenha = group.get("confirmarSenha")?.value

    return senha === confirmarSenha ? null : { notSame: true }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return
    }

    this.isLoading = true
    this.errorMessage = ""

    const usuario: UsuarioDto = {
      nome: this.registerForm.value.nome,
      email: this.registerForm.value.email,
      senha: this.registerForm.value.senha,
    }

    this.usuarioService.criarUsuario(usuario).subscribe({
      next: () => {
        this.isLoading = false
        this.router.navigate(["/"])
      },
      error: (error) => {
        this.isLoading = false
        this.errorMessage = error.message || "Erro ao criar conta. Tente novamente."
      },
    })
  }
}
