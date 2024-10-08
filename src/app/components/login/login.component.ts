import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientesFuturosComponent } from './children/clientes-futuros/clientes-futuros.component';
import { Tecnico } from 'src/app/models/tecnico';
import { TrabalheConoscoComponent } from './children/trabalhe-conosco/trabalhe-conosco.component';
import { PromocoesComponent } from './children/promocoes/promocoes.component';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  private toastr: ToastrService;
  private auth: AuthService;
  private router: Router;
  private snack: MatSnackBar;
  public isCreateCookie: boolean = false;

  constructor(public dialog: MatDialog, formBuilder: FormBuilder, toastr: ToastrService, auth: AuthService, router: Router, snack: MatSnackBar) {
    this.formLogin = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(3)]]
    });
    this.toastr = toastr;
    this.auth = auth;
    this.router = router;
    this.snack = snack;
    this.dialog = dialog;
  }

  ngOnInit(): void {
    this.abrirSnackCookies();
    this.openPromocoesDialog();
    this.lightTheme();
    this.initDataCookies();
  }

  public logar(): void {
    if (this.formLogin.valid) {
      let credenciais: Credenciais = this.formLogin.value;
      this.auth.authenticate(credenciais).subscribe({
        next: response => {
          let token: string | undefined = response.headers.get('Authorization')?.substring(7);
          if (this.auth.setToken(token)) {
            let decodeToken = this.auth.decodePayloadJWT();
            decodeToken = decodeToken.sub;
            this.setRole(decodeToken);
          }
          else {
            this.toastr.error("Acesso negado!", "Login");
          }
        },
        error: error => {
          this.toastr.error("E-mail e/ou senha incorreto.", "Login");
        }
      });
    }
    else {
      this.toastr.error("E-mail e/ou senha inválido.", "Login");
    }
  }

  setRole(decodeToken: any) {
    this.auth.findByEmail(decodeToken).subscribe({
      next: response => {
        let cred: any = response;
        let userId: any = cred.id;
        localStorage.setItem("userId", userId);
        localStorage.setItem("Username", cred.nome);
        localStorage.setItem("Cpf", cred.cpf);
        localStorage.setItem("Email", cred.email);
        if (JSON.stringify(cred.perfis.sort()) == JSON.stringify(['ADMIN', 'CLIENTE', 'TECNICO'])) {
          localStorage.setItem("role", "admin");
          this.router.navigate(['admin/dashboard']);
        } if (JSON.stringify(cred.perfis.sort()) == JSON.stringify(['CLIENTE', 'TECNICO'])) {
          localStorage.setItem("role", "tecnico");
          this.router.navigate(['/tecnico/dashboard']);
        } if (JSON.stringify(cred.perfis) == JSON.stringify(['CLIENTE'])) {
          localStorage.setItem("role", "cliente");
          this.router.navigate(['/cliente/dashboard']);
        }
      }
    });
  }

  abrirSnackCookies() {
    let mensagem: string = "Esta aplicação utiliza cookies e prosseguir com sua utilização significa concordar com nossa politica de privacidade e termos de uso. Consulte o administrador do sistema."
    this.snack.open(mensagem, "OK", {
      horizontalPosition: 'start', verticalPosition: 'bottom', panelClass: "snack"
    })
  }

  openClientesFuturos(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ClientesFuturosComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(TrabalheConoscoComponent, {
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
  openPromocoesDialog(): void {
    this.dialog.open(PromocoesComponent);
  }

  lightTheme() {
    document.body.classList.toggle('darkMode');
  }

  toggleCheck(check: MatCheckbox) {
    this.isCreateCookie = check.checked;
  }

  createCookie() {
    if (this.isCreateCookie) {
      let credenciais: Credenciais = this.formLogin.value;
      document.cookie = `email=${credenciais.email}; expires=${new Date(Date.now() + 86400000 * 30).toUTCString()}`;
      document.cookie = `senha=${credenciais.senha}; expires=${new Date(Date.now() + 86400000 * 30).toUTCString()}`;
    }
  }

  initDataCookies() {
    let datas: string[] = document.cookie.split(";");
    let email: string = datas[0];
    let senha: string = datas[1];
    email = email.substring(6, email.length);
    senha = senha.substring(7, senha.length);
    this.formLogin.setValue({ email: email, senha: senha });
  }
}
