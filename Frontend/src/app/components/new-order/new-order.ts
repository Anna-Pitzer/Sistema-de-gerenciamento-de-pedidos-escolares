import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { serverapi } from '../../helpers/serverapi';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-order',
  imports: [FormsModule, MatFormFieldModule, MatOptionModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, CommonModule, MatButtonModule, MatIconModule, NgxMaskDirective],
  templateUrl: './new-order.html',
  styleUrl: './new-order.scss',
  providers: [provideNgxMask()]
})
export class NewOrder implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    private route: Router,
    private route2: ActivatedRoute,
    private serverapi: serverapi,
    private cd: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.route2.params.pipe(takeUntil(this.destroy$)).subscribe(async (params) => {
      if (!this.dataLoaded) {
        await this.getData();
        this.dataLoaded = true;
      }
      if (params['pedido'] === undefined || params['pedido'] === 'new') {
        this.new = true;
        this.visualizar = false;
      } else if (params['pedido'] >= 0) {
        this.pedido = Number(params['pedido']);
        this.visualizar = false;
        const pedidoData = (await this.serverapi.routes.order.readByPedido({ pedido: this.pedido })).res;
        const productObject: any = {};
        pedidoData.map((v: any, i: number) => {
          if (i === 0) {
            this.form.controls.provider.setValue(v.provider);
            this.form.controls.dateDeliver.setValue(String(v.datedeliver).substring(0, 10));
          }
          if (productObject[v.product] === undefined) {
            productObject[v.product] = this.schoolsProductItems.length;
            this.schoolsProductItems[productObject[v.product]] = {
              product: v.product,
              productName: v.productname,
              quantity: 0,
              um: this.productsObject?.[Number(v.product)]?.um ?? 'UN',
              verifyChange: false,
              total: 0,
              schools: {}
            };
            this.addItem(false, v.product, 1, '');
          }
          this.schoolsProductItems[productObject[v.product]]['schools'][v.school] = v.quantity;
        });
      }
      this.cd.detectChanges();
    });

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (this.formItemsPrevius?.items !== null && this.formItemsPrevius?.items?.length !== 0) {
        value.items?.map((v: any, i: number) => {
          if (v.product !== this.formItemsPrevius?.items?.[i]?.product ||
            v.quantity !== this.formItemsPrevius?.items?.[i]?.quantity) {
            this.schoolsProductItems[i]['product'] = v.product;
            this.schoolsProductItems[i]['productName'] = this.productsObject?.[Number(v.product)]?.name ?? '';
            this.schoolsProductItems[i]['um'] = this.productsObject?.[Number(v.product)]?.um ?? 'UN';
            this.schoolsProductItems[i]['quantity'] = v.quantity;
            this.schools.map(vSchool => {
              if (this.schoolsProductItems?.[i]?.['schools']?.[vSchool.id] !== undefined) {
                const qty = this.consumptionObject?.[Number(v.product)]?.[Number(vSchool.id)] ?? 0;
                this.schoolsProductItems[i]['schools'][vSchool.id] = qty * v.quantity;
              }
            });
          }
        });
      }
      this.formItemsPrevius = value;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private formItemsPrevius: any = {}
  private dataLoaded: boolean = false
  public visualizar: boolean = true
  public pedido: number = NaN
  public new: boolean = false
  public dateCurrent = new Date()
  public products: any[] = []
  public productsOrderByName: any[] = []
  public providers: any[] = []
  public schools: any[] = []
  public productsObject: { [index: number]: any } = {}
  public providersObject: { [index: number]: any } = {}
  public consumptionObject: any = {}
  public form = new FormGroup({
    provider: new FormControl('', [Validators.required]),
    dateDeliver: new FormControl(
      this.dateCurrent.getFullYear() + '-' +
      String(this.dateCurrent.getMonth() + 1).padStart(2, '0') + '-' +
      String(this.dateCurrent.getDate()).padStart(2, '0'),
      [Validators.required]
    ),
    items: new FormArray<FormGroup<{
      product: FormControl<string | null>,
      quantity: FormControl<number>,
      um: FormControl<string>,
    }>>([])
  })

  public schoolsProductItems: {
    product: string;
    productName: string;
    quantity: number;
    um: string;
    verifyChange: boolean;
    total: number;
    schools: { [index: number]: number; }
  }[] = []

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  private async getData() {
    const [resProducts, resProviders, resSchools, resConsumption] = await Promise.all([
      this.serverapi.routes.products.read(),
      this.serverapi.routes.providers.read(),
      this.serverapi.routes.schools.read(),
      this.serverapi.routes.consumption.read()
    ]);

    this.products = resProducts.res;
    this.productsOrderByName = [...resProducts.res].sort((a: any, b: any) => a.name.localeCompare(b.name));
    this.providers = resProviders.res;
    this.schools = resSchools.res;

    this.consumptionObject = {};
    resConsumption.res.map((v: any) => {
      if (this.consumptionObject[Number(v.product)] === undefined) {
        this.consumptionObject[Number(v.product)] = {};
      }
      this.consumptionObject[Number(v.product)][Number(v.school)] = v.value;
    });

    this.productsObject = {};
    this.providersObject = {};
    this.products.map(v => this.productsObject[v.id] = v);
    this.providers.map(v => this.providersObject[v.id] = v);
    this.cd.detectChanges();
  }

  public addItem(addProductSchool = true, product: null | string = null, quantity: null | number = null, um: null | string = null) {
    if (addProductSchool) {
      const schoolsKey: any = {};
      this.schools.map(v => { schoolsKey[v.id] = 0; });
      this.schoolsProductItems.push({
        product: '',
        productName: '',
        quantity: 0,
        um: '',
        verifyChange: false,
        total: 0,
        schools: schoolsKey
      });
    }
    this.items.push(new FormGroup({
      product: new FormControl(product ?? null),
      quantity: new FormControl(quantity ?? 0),
      um: new FormControl(um ?? ''),
    }));
  }

  public deleteItem(i: number) {
    this.items.removeAt(i);
    this.schoolsProductItems.splice(i, 1);
  }

  public gerarEspelho() {
    const providerName = String(this.providersObject[Number(this.form.value.provider)]?.name ?? '');
    const dateDeliver  = String(this.form.value.dateDeliver);

    const products = this.schoolsProductItems.map(item => {
      const schoolsMap: { [schoolId: string]: number } = {};
      this.schools.forEach(s => {
        schoolsMap[String(s.id)] = item.schools[s.id] ?? 0;
      });
      return { id: Number(item.product), name: item.productName, schools: schoolsMap };
    });

    const schools = this.schools.map(s => ({ id: s.id, name: s.name }));

    this.serverapi.routes.order.espelho({ providerName, dateDeliver, schools, products })
      .then(res => {
        if (!res.res) { alert('Erro ao gerar espelho'); return; }
        const binary = atob(res.res);
        const bytes  = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = `espelho_pedido.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
      }, () => alert('Erro ao comunicar com o servidor'));
  }

  public cancel() {
    const parts = String(this.route.url).split('/');
    this.route.navigate(['/' + parts.slice(1, parts.length - 1).join('/')]);
  }

  public update() {
    const items: { product: number; productname: string; productname2: string | null; school: number; quantity: number; }[] = [];
    this.schoolsProductItems.map(v =>
      this.schools.map(vSchool => {
        items.push({
          product: Number(v.product),
          productname: String(this.productsObject[Number(v.product)]?.name),
          productname2: this.productsObject[Number(v.product)]?.name2 ?? null,
          school: vSchool.id,
          quantity: v.schools[vSchool.id]
        });
      })
    );
    this.serverapi.routes.order.update({
      pedido: this.pedido,
      provider: Number(this.form.value.provider),
      providerName: String(this.providersObject[Number(this.form.value.provider)]['name']),
      dateDeliver: String(this.form.value.dateDeliver),
      items
    }).then(res => {
      if (res.res === true) {
        this.cancel();
      } else {
        alert('Ocorreu um erro ao salvar o pedido');
      }
    }, () => alert('Ocorreu um erro ao tentar se comunicar com o servidor'));
  }

  public create() {
    const items: { product: number; productname: string; productname2: string | null; school: number; quantity: number; }[] = [];
    this.schoolsProductItems.map(v =>
      this.schools.map(vSchool => {
        items.push({
          product: Number(v.product),
          productname: String(this.productsObject[Number(v.product)]?.name),
          productname2: this.productsObject[Number(v.product)]?.name2 ?? null,
          school: vSchool.id,
          quantity: v.schools[vSchool.id]
        });
      })
    );
    this.serverapi.routes.order.create({
      provider: Number(this.form.value.provider),
      providerName: String(this.providersObject[Number(this.form.value.provider)]['name']),
      dateDeliver: String(this.form.value.dateDeliver),
      items
    }).then(res => {
      if (res.res === true) {
        this.cancel();
      } else {
        alert('Ocorreu um erro ao criar o pedido');
      }
    }, () => alert('Ocorreu um erro ao tentar se comunicar com o servidor'));
  }
}
