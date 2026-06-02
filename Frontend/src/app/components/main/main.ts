import { CommonModule, Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { serverapi } from '../../helpers/serverapi';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  imports: [RouterLink, CommonModule, MatIconModule, MatListModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    private location: Location,
    private router: Router,
    private serverapi: serverapi,
    private cd: ChangeDetectorRef
  ) {}

  public pedidosAberto: number = 0;

  async ngOnInit() {
    await this.carregarPedidos();

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(async () => {
      await this.carregarPedidos();
    });
  }

  private async carregarPedidos() {
    const res = await this.serverapi.routes.order.read();
    if (res.res) {
      const pedidos = new Set(res.res.filter((v: any) => v.status === 0).map((v: any) => v.pedido));
      this.pedidosAberto = pedidos.size;
      this.cd.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  back() {
    this.location.back();
  }
}
