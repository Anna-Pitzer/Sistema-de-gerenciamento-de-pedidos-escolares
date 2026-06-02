import { ChangeDetectorRef, Component } from '@angular/core';
import { serverapi } from '../../helpers/serverapi';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import jsPDF from 'jspdf';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-order',
  imports: [RouterLink, CommonModule, MatIconModule, MatTabsModule],
  templateUrl: './order.html',
  styleUrl: './order.scss',
})
export class Order {
  constructor(private serverapi: serverapi, private cd: ChangeDetectorRef) {}

  public ordersAberto: any[] = []
  public ordersFinalizado: any[] = []
  public providers: any[] = []
  public products: any[] = []
  public schools: any[] = []
  public productsObject: any = {}
  public schoolsObject: any = {}

  async ngOnInit() {
    const [resProducts, resProviders, resSchools, resOrders] = await Promise.all([
      this.serverapi.routes.products.read(),
      this.serverapi.routes.providers.read(),
      this.serverapi.routes.schools.read(),
      this.serverapi.routes.order.read()
    ]);
    this.products = resProducts.res;
    this.providers = resProviders.res;
    this.schools = resSchools.res;
    this.products.map((v: any) => this.productsObject[v.id] = v);
    this.schools.map((v: any) => this.schoolsObject[v.id] = v);
    const orders = this.mountOrder(resOrders.res.map((v: any) => ({ ...v })));
    this.ordersAberto = orders.filter((v: any) => v.status === 0);
    this.ordersFinalizado = orders.filter((v: any) => v.status === 1);
    this.cd.detectChanges();
  }

  private mountOrder(orders: any[]): any[] {
    let orderPedidoOld: number = NaN;
    let c = -1;
    const newOrders: any[] = [];
    orders.map(v => {
      if (v.pedido !== orderPedidoOld) {
        c++;
        newOrders[c] = {
          id: v.id, pedido: v.pedido, provider: v.provider,
          providername: v.providername, datedeliver: v.datedeliver,
          status: v.status, date: v.date, items: []
        };
      }
      newOrders[c].items.push({
        id: v.id, item: v.item, product: v.product,
        productname: v.productname, productname2: v.productname2,
        productUm: String(this.productsObject[v.product]?.um),
        quantity: v.quantity, school: v.school,
        schoolName: String(this.schoolsObject?.[v.school]?.name)
      });
      orderPedidoOld = v.pedido;
    });
    return newOrders;
  }

  public async printOrder(items: any) {
    createPdfOrder.create(JSON.parse(JSON.stringify(items)));
  }

  public async deleteOrder(order: any) {
    if (!confirm(`Deseja excluir o pedido #${order.pedido}?`)) return;
    const res = await this.serverapi.routes.order.delete({ pedido: order.pedido });
    if (res.res) {
      this.ordersAberto = this.ordersAberto.filter((v: any) => v.pedido !== order.pedido);
      this.ordersFinalizado = this.ordersFinalizado.filter((v: any) => v.pedido !== order.pedido);
      this.cd.detectChanges();
    } else {
      alert('Erro ao excluir o pedido');
    }
  }

  public async finishOrder(order: any) {
    if (!confirm(`Deseja finalizar o pedido #${order.pedido}?`)) return;
    const res = await this.serverapi.routes.order.finish({ pedido: order.pedido });
    if (res.res) {
      const finished = this.ordersAberto.find((v: any) => v.pedido === order.pedido);
      this.ordersAberto = this.ordersAberto.filter((v: any) => v.pedido !== order.pedido);
      if (finished) { finished.status = 1; this.ordersFinalizado.push(finished); }
      this.cd.detectChanges();
    } else {
      alert('Erro ao finalizar o pedido');
    }
  }
}

class createPdfOrder {
  private static promiseImegAwaited: any = null;

  public static async create(items: any[]) {
    const pdfObject = new jsPDF({});
    //Descomente a linha a seguir para colocar a logo e o nome
    /*const promiseImeg: Promise<HTMLImageElement> = new Promise((resolve, reject) => {
      const img = new Image();
      img.src = '';
      img.onload = () => resolve(img);
      img.onerror = reject;
    });*/
    //this.promiseImegAwaited = await promiseImeg;
    this.printItems(pdfObject, items);
    pdfObject.save('pedido.pdf');
  }

  private static calcHeight(pdfObject: jsPDF, v: any): number {
    pdfObject.setFont('Helvetica', 'bold');
    let linhaReturn: number = pdfObject.getTextDimensions(`${v.productname}`).h;
    let column = 31 + 4 + pdfObject.getTextDimensions(`${v.productname}`).w;
    pdfObject.setFont('Helvetica', '');
    pdfObject.setFontSize(7.8);
    if (v.productname2 !== null) {
      v.productname2.split(' ')
        .map((vStr: string) => ({ value: vStr, width: pdfObject.getTextDimensions(` ${vStr}`).w }))
        .map((vStr2: { value: string, width: number }) => {
          if (column + pdfObject.getTextDimensions(` ${vStr2}`).w >= 160) {
            linhaReturn += 4;
            column = 31;
          }
          column += vStr2.width;
        });
    }
    return linhaReturn;
  }

  private static printCabLayout(pdfObject: jsPDF, schoolName: string, providername: string, orderDate: Date) {
    const orderDate2 = new Date(orderDate);
    const orderDate3 = String(orderDate2.getDate()).padStart(2, '0') + '/' + String(orderDate2.getMonth() + 1).padStart(2, '0') + '/' + orderDate2.getFullYear();
    //descomente a linha abaixo para que a imagem apareça no PDF
    //pdfObject.addImage(this.promiseImegAwaited, 'PNG', 10, 10, 10, 10);
    pdfObject.setFontSize(10);
    pdfObject.setFont('Helvetica');
    pdfObject.text('Nome da instituição', 21, 13);
    pdfObject.text('Nome do departamento', 21, 16);
    pdfObject.text('Nome da divisão', 21, 19);
    pdfObject.setFont('Helvetica', 'bold');
    pdfObject.text('GUIA DE REMESSA DE GÊNERO', 105, 25, { align: 'center' });
    pdfObject.text(schoolName, 105, 33, { align: 'center' });
    pdfObject.text(`DATA DE ENTREGA: ${orderDate3}`, 105, 37, { align: 'center' });
    pdfObject.setFont('Helvetica', '');
    pdfObject.text(`Fornecedor: ${providername}`, 105, 41, { align: 'center' });
    pdfObject.setFont('Helvetica', 'bold');
    pdfObject.text('ITEM', 20, 45, { align: 'center' });
    pdfObject.text('DESCRIÇÃO', 65, 45, { align: 'center' });
    pdfObject.text('UM', 170, 45, { align: 'center' });
    pdfObject.text('QUANT', 190, 45, { align: 'center' });
    pdfObject.setFontSize(9);
    pdfObject.setFont('Helvetica', 'bold');
    pdfObject.text('COMPROVANTE DE ENTREGA', 105, 185, { align: 'center' });
    pdfObject.setFont('Helvetica', '');
    pdfObject.text(`${schoolName}`, 105, 188, { align: 'center' });
    pdfObject.text(`DATA DE ENTREGA: ${orderDate3}`, 105, 191, { align: 'center' });
    pdfObject.text(`Fornecedor: ${providername}`, 105, 194, { align: 'center' });
    pdfObject.setFont('Helvetica', 'bold');
    pdfObject.text('Em caso de FALTA OU DEVOLUÇÃO do produto que não comfere com o solicitado, especificar abaixo, datar e assinar ', 11, 199, { align: 'left' });
    pdfObject.text('somente no primeiro campo.', 11, 202, { align: 'left' });
    pdfObject.line(12, 207, 198, 207); pdfObject.line(12, 211, 198, 211);
    pdfObject.line(12, 215, 198, 215); pdfObject.line(12, 219, 198, 219);
    pdfObject.setFont('Helvetica', '');
    pdfObject.text('Local,', 11, 225, { align: 'left' });
    pdfObject.text('/', 33, 225, { align: 'left' });
    pdfObject.text('/', 45, 225, { align: 'left' });
    pdfObject.line(70, 225, 142, 225);
    pdfObject.setFontSize(7);
    pdfObject.text('Assinatura do responsavel pelo recebimento parcial dos items.', 106, 227.5, { align: 'center' });
    pdfObject.setFontSize(9);
    pdfObject.setFont('Helvetica', 'bold');
    pdfObject.text('Observação', 95, 254, { align: 'left' });
    pdfObject.text('Em caso de entrega TOTAL, favor datar e assinar abaixo.', 11, 233, { align: 'left' });
    pdfObject.setFontSize(8);
    pdfObject.setFont('Helvetica', '');
    pdfObject.text('Declaro ter recebido todos gêneros constantes na gula acima, dentro das especificações determinadas e de otima qualidade.', 11, 236, { align: 'left' });
    pdfObject.setFontSize(9);
    pdfObject.setFont('Helvetica', '');
    pdfObject.text('São José,', 11, 243, { align: 'left' });
    pdfObject.text('/', 33, 243, { align: 'left' });
    pdfObject.text('/', 45, 243, { align: 'left' });
    pdfObject.line(70, 243, 142, 243);
    pdfObject.setFontSize(7);
    pdfObject.text('Assinatura do responsavel pelo recebimento total dos items.', 106, 245.5, { align: 'center' });
    pdfObject.setFontSize(9);
    pdfObject.line(10, 30, 200, 30); pdfObject.line(10, 34, 200, 34);
    pdfObject.line(10, 38, 200, 38); pdfObject.line(10, 42, 200, 42);
    pdfObject.line(10, 180, 200, 180); pdfObject.line(10, 30, 10, 180); pdfObject.line(200, 30, 200, 180);
    pdfObject.line(30, 42, 30, 180); pdfObject.line(160, 42, 160, 180); pdfObject.line(180, 42, 180, 180);
    pdfObject.line(10, 182, 200, 182); pdfObject.line(10, 249, 200, 249);
    pdfObject.line(10, 182, 10, 249); pdfObject.line(200, 182, 200, 249);
    pdfObject.line(10, 251, 200, 251); pdfObject.line(10, 290, 200, 290);
    pdfObject.line(10, 251, 10, 290); pdfObject.line(200, 251, 200, 290);
  }

  private static printItems(pdfObject: jsPDF, order: any) {
    order.items = (() => {
      const newItems: any[] = [];
      let schoolOld = NaN;
      let contador = -1;
      order.items.map((v: any) => {
        if (v.school !== schoolOld) {
          contador++;
          newItems[contador] = { school: v.school, schoolName: v.schoolName, items: [] };
        }
        newItems[contador].items.push(v);
        schoolOld = v.school;
      });
      return newItems;
    })();

    let linha = 49;
    let column: number = 31;
    order.items.map((vSchool: any, iSchool: number) => {
      if (iSchool > 0) pdfObject.addPage();
      this.printCabLayout(pdfObject, vSchool.schoolName, order.providername, order.datedeliver);
      linha = 49;
      vSchool.items.map((v: any, i: number) => {
        if (linha + this.calcHeight(pdfObject, v) >= 170) {
          pdfObject.addPage();
          linha = 49;
          this.printCabLayout(pdfObject, vSchool.schoolName, order.providername, order.datedeliver);
        }
        pdfObject.setFont('Helvetica', '');
        pdfObject.text(`${i + 1}`, 11, linha, { align: 'left' });
        pdfObject.text(`${v.productUm}`, 161, linha, { align: 'left' });
        pdfObject.text(`${v.quantity.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 199, linha, { align: 'right' });
        pdfObject.setFont('Helvetica', 'bold');
        pdfObject.text(`${v.productname}`, 31, linha, { align: 'left' });
        pdfObject.setFont('Helvetica', '');
        column = 31 + 4 + pdfObject.getTextDimensions(`${v.productname}`).w;
        pdfObject.setFontSize(7.8);
        if (v.productname2 != null) {
          if (v.productname2 == 'null') v.productname2 = '';
          v.productname2.split(' ')
            .map((vStr: string) => ({ value: vStr, width: pdfObject.getTextDimensions(` ${vStr}`).w }))
            .map((vStr2: { value: string, width: number }) => {
              if (column + pdfObject.getTextDimensions(` ${vStr2}`).w >= 160) { linha += 4; column = 31; }
              pdfObject.text(`${vStr2.value}`, column, linha, { align: 'left' });
              column += vStr2.width;
            });
        }
        linha += 4;
      });
    });
  }
}
