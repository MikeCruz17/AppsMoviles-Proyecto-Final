import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup; 

  constructor(public pb: FormBuilder) {
    this.formularioLogin = this.pb.group({
      'cedula': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
    });
  }

  ngOnInit() {
  }

  async ingresar(){
    var f = this.formularioLogin.value;

    // var usuario = JSON.parse(localStorage.getItem(''));

    // VALIDAR DATOS DE INGRESO

  }

}
