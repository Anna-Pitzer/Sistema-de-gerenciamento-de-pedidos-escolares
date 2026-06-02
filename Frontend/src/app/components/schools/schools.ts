import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { serverapi } from '../../helpers/serverapi';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-schools',
  imports: [RouterLink, CommonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './schools.html',
  styleUrl: './schools.scss',
})
export class Schools implements OnDestroy {

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
        const school = (await this.serverapi.routes.schools.read()).res.filter((v: any) => v.id === this.id)[0];
        // Corrigido: verificar undefined ANTES de acessar propriedades para evitar crash
        if (school === undefined) {
          this.router.navigate(['/']);
          return;
        }
        this.form.setValue({
          name: school.name, status: school.status,
          students: school.students, converter: school.converter
        });
      } else if (params['id'] == 'new') {
        this.new = true;
      } else {
        this.schools = (await this.serverapi.routes.schools.read()).res;
      }
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public schools: { id: number, name: string, shortname: string, status: number, students: number, converter: number }[] = []
  public new: boolean = false
  public id: number = NaN
  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    students: new FormControl('', [Validators.required]),
    converter: new FormControl('', [Validators.required]),
  })

  create() {
    this.serverapi.routes.schools.create({
      name: String(this.form.value.name),
      converter: Number(this.form.value.converter),
      status: Number(this.form.value.status),
      students: Number(this.form.value.students),
    }).then(res => {
      if (res.code !== 200) { alert('Ocorreu um erro desconhecido'); return; }
      if (!res.res) { alert('Não foi possivel alterar o registro'); return; }
      this.router.navigate(['/main/schools']);
    }, () => alert('Ocorreu um erro ao tentar se conectar com o servidor'));
  }

  update() {
    this.serverapi.routes.schools.update({
      id: Number(this.id),
      name: String(this.form.value.name),
      students: Number(this.form.value.students),
      converter: Number(this.form.value.converter),
      status: Number(this.form.value.status),
    }).then(res => {
      if (res.code !== 200) { alert('Ocorreu um erro desconhecido'); return; }
      if (!res.res) { alert('Não foi possivel alterar o registro'); return; }
      this.router.navigate(['/main/schools']);
    }, () => alert('Ocorreu um erro ao tentar se conectar com o servidor'));
  }

  delete(index: number, id: number) {
    this.serverapi.routes.schools.delete({ id }).then(res => {
      if (res.code !== 200) { alert('Ocorreu um erro desconhecido'); return; }
      if (!res.res) { alert('Não foi possivel apagar o registro'); return; }
      this.schools.splice(index, 1);
      this.cd.detectChanges();
    }, () => alert('Ocorreu um erro ao tentar se conectar com o servidor'));
  }
}
