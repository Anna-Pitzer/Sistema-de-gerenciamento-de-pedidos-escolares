import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { serverapi } from '../../helpers/serverapi';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-providers',
  imports: [MatButtonModule, RouterLink, MatIconModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './providers.html',
  styleUrl: './providers.scss',
})
export class Providers implements OnDestroy {

  // Subject para cancelar subscriptions ao destruir o componente (evita memory leak)
  private destroy$ = new Subject<void>();

  constructor(
    private serverapi: serverapi,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(async (params) => {
      if (params['id'] !== undefined && params['id'] >= 0) {
        this.id = Number(params['id']);
        const provider = (await this.serverapi.routes.providers.read()).res.filter((v: any) => v.id === this.id)[0];
        // Corrigido: verificar undefined ANTES de acessar propriedades para evitar crash
        if (provider === undefined) {
          this.router.navigate(['/']);
          return;
        }
        this.form.setValue({ name: provider.name, status: provider.status });
      } else if (params['id'] == 'new') {
        this.new = true;
      } else {
        this.providers = (await this.serverapi.routes.providers.read()).res;
      }
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public providers: { id: number, name: string, status: number }[] = []
  public new: boolean = false
  public id: number = NaN
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  })

  create() {
    this.serverapi.routes.providers.create({
      name: String(this.form.value.name),
      status: Number(this.form.value.status),
    }).then(res => {
      if (res.code !== 200) { alert('Ocorreu um erro desconhecido'); return; }
      if (!res.res) { alert('Não foi possivel alterar o registro'); return; }
      this.router.navigate(['/main/providers']);
    }, () => alert('Ocorreu um erro ao tentar se conectar com o servidor'));
  }

  update() {
    this.serverapi.routes.providers.update({
      id: Number(this.id),
      name: String(this.form.value.name),
      status: Number(this.form.value.status),
    }).then(res => {
      if (res.code !== 200) { alert('Ocorreu um erro desconhecido'); return; }
      if (!res.res) { alert('Não foi possivel alterar o registro'); return; }
      this.router.navigate(['/main/providers']);
    }, () => alert('Ocorreu um erro ao tentar se conectar com o servidor'));
  }

  delete(index: number, id: number) {
    this.serverapi.routes.providers.delete({ id }).then(res => {
      if (res.code !== 200) { alert('Ocorreu um erro desconhecido'); return; }
      if (!res.res) { alert('Não foi possivel apagar o registro'); return; }
      this.providers.splice(index, 1);
      this.cd.detectChanges();
    }, () => alert('Ocorreu um erro ao tentar se conectar com o servidor'));
  }
}
