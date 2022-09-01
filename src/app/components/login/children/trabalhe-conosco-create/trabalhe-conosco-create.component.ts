import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trabalhe-conosco-create',
  templateUrl: './trabalhe-conosco-create.component.html',
  styleUrls: ['./trabalhe-conosco-create.component.scss']
})
export class TrabalheConoscoCreateComponent implements OnInit {

  public formCadastro: FormGroup;
  public formBuillder: FormBuilder;

  constructor(formBuillder: FormBuilder) {
    this.formBuillder = formBuillder;
    this.formCadastro = formBuillder.group({
      nome: [""],
      formacao: [""],
      telefone: [""],
      experiencia: [""],
      linkedin: [""]
    })
  }

  ngOnInit(): void {
  }

  send(){
    let cadastro = this.formCadastro.value
    console.log(cadastro)
    alert("enviado")
  }
}
