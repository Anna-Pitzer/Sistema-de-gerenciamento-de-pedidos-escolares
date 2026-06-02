import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { StorageData } from "./storage";


@Injectable({
    providedIn: 'root'
})
export class serverapi {
    constructor(private http: HttpClient) { }
    private server: string = `${location.hostname}:3003`
    private async getData(route: any, data: any): Promise<{ code: number, msg: string, res: any }> {
        let a: any = await firstValueFrom(this.http.post(`http://${this.server}/${route}`, { data: data, token: this.getToken() })).catch((err) => ({ code: 101, msg: "", res: {} }));
        return { code: a.code, msg: a.msg, res: a.res }
    }
    private getToken = (): string => String(StorageData.get('user')?.token)

    public routes = {
        system: {
            login: async (p: { username: string, password: string }) => await this.getData('login', p),
            logout: async () => await this.getData('logout', {}),
            verifySession: async () => await this.getData('verify-session', {}),
            changePassword: async (p: { password: string }) => await this.getData('change-password', p),
        },
        schools: {
            read: async () => await this.getData('schools/read', {}),
            create: async (p: { name: string, status: number, students: number, converter: number }) => await this.getData('schools/create', p),
            update: async (p: { id: number, name: string, status: number, students: number, converter: number }) => await this.getData('schools/update', p),
            delete: async (p: { id: number }) => await this.getData('schools/delete', p)
        },
        products: {
            read: async () => await this.getData('products/read', {}),
            create: async (p: { name: string, name2: string, converter: number, status: number, um: string }) => await this.getData('products/create', p),
            update: async (p: { id: number, name: string, name2: string, converter: number, status: number, um: string }) => await this.getData('products/update', p),
            delete: async (p: { id: number }) => await this.getData('products/delete', p)
        },
        providers: {
            read: async () => await this.getData('providers/read', {}),
            create: async (p: { name: string, status: number }) => await this.getData('providers/create', p),
            update: async (p: { id: number, name: string, status: number }) => await this.getData('providers/update', p),
            delete: async (p: { id: number }) => await this.getData('providers/delete', p)
        },
        consumption: {
            read: async () => await this.getData('consumption/read', {}),
            set: async (p: { list: {school: number, product: number,value:number}[] }) => await this.getData('consumption/set', p),
        },
        order: {
            read: async () => await this.getData('order/read', {}),
            readByPedido: async (p: { pedido: number }) => await this.getData('order/read-by-pedido', p),
            create: async (p: {
                provider: number,
                providerName: string,
                dateDeliver: string,
                items: {
                    product: number, productname: string, productname2: string | null,
                    school: number, quantity: number
                }[]
            }) => await this.getData('order/create', p),
            update: async (p: {
                pedido: number,
                provider: number,
                providerName: string,
                dateDeliver: string,
                items: {
                    product: number, productname: string, productname2: string | null,
                    school: number, quantity: number
                }[]
            }) => await this.getData('order/update', p),
            delete: async (p: { pedido: number }) => await this.getData('order/delete', p),
            finish: async (p: { pedido: number }) => await this.getData('order/finish', p),
            espelho: async (p: {
                providerName: string,
                dateDeliver: string,
                schools: { id: number, name: string }[],
                products: { id: number, name: string, schools: { [schoolId: string]: number } }[]
            }) => await this.getData('order/espelho', p),
        },
    }
}