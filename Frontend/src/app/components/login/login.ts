import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageData } from '../../helpers/storage';
import { serverapi } from '../../helpers/serverapi';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    MatCardModule, MatGridListModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,

})
export class Login {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private serverapi: serverapi) {
    this.matIconRegistry.registerFontClassAlias('material-icons-outlined');
  }

  ngOnInit() {
  }
public texto = ''
  public alteraTeste(){
    this.texto = 'teste12312123'
  }

  @Output() fnLogin = new EventEmitter<any>();
  public form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  public login(): void {
    this.serverapi.routes.system.login({ username: String(this.form.value.username), password: String(this.form.value.password) }).then(res => {
      if (res.code !== 200) {
        alert("Ocorreu um erro ao tentar se comunicar com o servido")
      } else {
        this.fnLogin.emit(res.res)
      }
    })
  }


  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
