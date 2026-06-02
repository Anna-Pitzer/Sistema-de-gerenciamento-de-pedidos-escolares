import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { serverapi } from '../../helpers/serverapi';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-consumo',
  imports: [RouterLink, CommonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './consumo.html',
  styleUrl: './consumo.scss',
})
export class Consumo implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(private serverapi: serverapi, private cd: ChangeDetectorRef) {}

  async ngOnInit() {
    await this.getData();
    this.mountData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public async getData() {
    const [resConsumptions, resSchools, resProducts] = await Promise.all([
      this.serverapi.routes.consumption.read(),
      this.serverapi.routes.schools.read(),
      this.serverapi.routes.products.read()
    ]);
    this.consumptions = resConsumptions.res;
    this.schools = resSchools.res;
    this.products = resProducts.res;
    this.cd.detectChanges();
  }

  public mountData() {
    this.rel = [];
    this.consumptionsObject = {};
    this.consumptions.map(v => {
      if (this.consumptionsObject[Number(v.product)] === undefined) {
        this.consumptionsObject[Number(v.product)] = {};
      }
      this.consumptionsObject[Number(v.product)][Number(v.school)] = v.value;
    });
    this.rel = this.products.map(v => ({
      ...v, schools: this.schools.map(v2 => ({
        ...v2,
        value: this.consumptionsObject?.[v.id]?.[v2.id] ?? 0,
        value2: this.consumptionsObject?.[v.id]?.[v2.id] ?? 0
      }))
    }));
    this.cd.detectChanges();
  }

  public async gravar() {
    const data: { school: number; product: number; value: number; }[] = [];
    this.rel.map(v => {
      v.schools.map((v2: any) => {
        if (v2.value2 !== v2.value)
          data.push({ school: v2.id, product: v.id, value: Number(v2.value2) });
      });
    });
    if (data.length === 0) { alert('Nenhuma alteração detectada'); return; }
    this.serverapi.routes.consumption.set({ list: data }).then(async (res) => {
      if (res.code !== 200) { alert('Ocorreu um erro desconhecido'); return; }
      if (!res.res) { alert('Não foi possivel alterar o registro'); return; }
      await this.getData();
      this.mountData();
      this.cd.detectChanges();
    });
  }

  public columnfocus: null | number = 0;
  public rowfocus: null | number = null;
  public consumptions: any[] = [];
  public schools: any[] = [];
  public products: any[] = [];
  public consumptionsObject: { [index: number]: { [index: number]: number } } = {};
  public rel: any[] = [];
  public productSearch: string = '';
}
