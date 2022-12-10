import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioLogin: FormGroup; 

  constructor(public pb: FormBuilder) {
    this.formularioLogin = this.pb.group({
      'nombre': new FormControl("",Validators.required),
      'apellido': new FormControl("",Validators.required),
      'correo': new FormControl("",Validators.required),
      'cedula': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'ConfirmPassword': new FormControl("",Validators.required),
    });
  }

  ngOnInit() {
  }

  async guardar(){
    var f = this.formularioLogin.value;

    if(this.formularioLogin.invalid){
      // AQUI DEBE DE IR LA ALERTA YA QUE LOS CAMPOS NO PUEDEN IR VACIOS

    }

    var usuario = {
      nombre: f.nombre,
      apellido: f.apellido,
      correo: f.correo,
      cedula: f.cedula,
      password: f.password,
      ConfirmPassword: f.ConfirmPassword
    }

    // EN LUGAR DEL LOCALSTORAGE DEBE DE IR EL ENVÍO DE LA PETICIÓN A LA API
    localStorage.setItem('usuario', JSON.stringify(usuario));

  }

}
