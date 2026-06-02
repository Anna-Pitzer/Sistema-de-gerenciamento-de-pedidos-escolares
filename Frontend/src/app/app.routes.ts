import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Main } from './components/main/main';
import { Order } from './components/order/order';
import { NewOrder } from './components/new-order/new-order';
import { Products } from './components/products/products';
import { Schools } from './components/schools/schools';
import { Providers } from './components/providers/providers';
import { MyAcount } from './components/my-acount/my-acount';
import { Consumo } from './components/consumo/consumo';

export const routes: Routes = [
    { path: '', component: Main },
    { path: 'login', component: Login },
    { path: 'main/order', component: Order },
    { path: 'main/order/new', component: NewOrder },
    { path: 'main/order/:pedido', component: NewOrder },
    { path: 'main/products', component: Products },
    { path: 'main/products/:id', component: Products },
    { path: 'main/schools', component: Schools },
    { path: 'main/schools/:id', component: Schools },
    { path: 'main/providers', component: Providers },
    { path: 'main/providers/:id', component: Providers },
    { path: 'main/my-acount', component: MyAcount },
    { path: 'main/consumption', component: Consumo },


    { path: 'main', component: Main },

];
