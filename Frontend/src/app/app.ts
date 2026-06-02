import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Login } from './components/login/login';
import { CommonModule } from '@angular/common';
import { StorageData } from './helpers/storage';
import { serverapi } from './helpers/serverapi';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, CommonModule, ReactiveFormsModule,
    FormsModule, MatFormFieldModule, MatInputModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    MatCardModule, MatGridListModule, MatButtonModule, FormsModule, ReactiveFormsModule,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('secct-app-nutricao');
  constructor(private router: Router, private serverApi: serverapi, private cd: ChangeDetectorRef) {

  }
  async ngOnInit() {
    this.loginActive = await this.verifySession()
    this.cd.detectChanges()
    this.changeRoute()
  }

  changeRoute() {
    if (this.loginActive === 1) {
      this.router.navigate(['/login'])
    } else if (this.loginActive === 2 && (this.router.url === '/login' || this.router.url === '/')) {
      this.router.navigate(['/main'])
    }
  }

  public loginActive: 0 | 1 | 2 = 0
  private async verifySession(): Promise<1 | 2> {
    let a: any = StorageData.get('user')
    return (a === null || a?.['id'] === undefined || ! await this.checkSessionServer(a['token'])) ? 1 : 2
  }

  private async checkSessionServer(token: string): Promise<boolean> {
    return (await this.serverApi.routes.system.verifySession()).res
  }

  public async login(data: any) {
    StorageData.set('user', {
      id: data.id,
      username: data.username,
      name: data.name,
      token: data.token,
      acessosLista: data.acessosLista,
      menusLista: data.acessosLista
    })
    this.loginActive = await this.verifySession()
    this.cd.detectChanges()
    this.changeRoute()
  }

  public async logout() {
    if ((await this.serverApi.routes.system.logout()).res) {
      StorageData.remove('user')
    }
    this.loginActive = await this.verifySession()
    this.cd.detectChanges()
    this.changeRoute()
  }
}
