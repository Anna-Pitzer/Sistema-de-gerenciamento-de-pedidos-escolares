import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { serverapi } from '../../helpers/serverapi';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [RouterLink, CommonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    private serverapi: serverapi,
    private cd: ChangeDetectorRef,
    private matIconRegistry: MatIconRegistry,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.matIconRegistry.registerFontClassAlias('material-icons-outlined');
  }

  async ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(async (params) => {
      if (params['id'] !== undefined && params['id'] >= 0) {
        this.id = Number(params['id']);
      } else if (params['id'] == 'new') {
        this.new = true;
      }
      this.products = (await this.serverapi.routes.products.read()).res;
      this.productsOrdered = this.products;
      if (this.id > -1) {
        const product: any = this.products.filter(v => v.id == this.id)[0];
        if (product !== undefined) {
          this.form.setValue({
            id: product.id, name: product.name, name2: product.name2,
            converter: product.converter, status: product.status, um: product.um
          });
        } else {
          this.router.navigate(['/']);
        }
      }
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public id: number = NaN
  public new: boolean = false
  public products: any[] = []
  public productsOrdered: any[] = []
  public form = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    name2: new FormControl('', [Validators.required]),
    converter: new FormControl(1, [Validators.required]),
    status: new FormControl(0, [Validators.required]),
    um: new FormControl('UN', [Validators.required])
  })
  orderByField: string = ''
  orderByType: string = ''

  public orderByRel(field: string) {
    const fnConvertNumber = (a: any, b: any, str: string, d: boolean = false) => {
      if (!d) {
        return (typeof a[field] === 'number') ? (a[field] === b[field] ? 0 : a[field] > b[field] ? 1 : -1) : a[field].localeCompare(b[field]);
      } else {
        return (typeof a[field] === 'number') ? (a[field] === b[field] ? 0 : b[field] > a[field] ? 1 : -1) : b[field].localeCompare(a[field]);
      }
    };
    if (field != this.orderByField) {
      this.orderByType = 'c';
      this.productsOrdered = this.products.sort((a: any, b: any) => fnConvertNumber(a, b, field));
    } else {
      this.orderByType = (this.orderByType == 'c') ? 'd' : 'c';
      this.productsOrdered = this.products.sort((a: any, b: any) => (this.orderByType == 'c') ? fnConvertNumber(a, b, field) : fnConvertNumber(a, b, field, true));
    }
    this.orderByField = field;
  }

  create() {
    this.serverapi.routes.products.create({
      name: String(this.form.value.name),
      name2: String(this.form.value.name2),
      converter: Number(this.form.value.converter),
      status: Number(this.form.value.status),
      um: String(this.form.value.um),
    }).then(res => {
      if (res.code !== 200) { alert('Ocorreu um erro desconhecido'); return; }
      if (!res.res) { alert('Não foi possivel alterar o registro'); return; }
      this.router.navigate(['/main/products']);
    }, () => alert('Ocorreu um erro ao tentar se conectar com o servidor'));
  }

  update() {
    this.serverapi.routes.products.update({
      id: Number(this.id),
      name: String(this.form.value.name),
      name2: String(this.form.value.name2),
      converter: Number(this.form.value.converter),
      status: Number(this.form.value.status),
      um: String(this.form.value.um),
    }).then(res => {
      if (res.code !== 200) { alert('Ocorreu um erro desconhecido'); return; }
      if (!res.res) { alert('Não foi possivel alterar o registro'); return; }
      this.router.navigate(['/main/products']);
    }, () => alert('Ocorreu um erro ao tentar se conectar com o servidor'));
  }

  delete(index: number, id: number) {
    this.serverapi.routes.products.delete({ id }).then(res => {
      if (res.code !== 200) { alert('Ocorreu um erro desconhecido'); return; }
      if (!res.res) { alert('Não foi possivel apagar o registro'); return; }
      this.products.splice(index, 1);
      this.cd.detectChanges();
    }, () => alert('Ocorreu um erro ao tentar se conectar com o servidor'));
  }
}
