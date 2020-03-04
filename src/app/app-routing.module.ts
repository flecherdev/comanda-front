import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    // pathMatch: 'prefix',
    component: LayoutComponent,
    children: [
      {
        path: 'mesa',
        canActivate: [AuthGuard],
        data: { roles : [5, 4]},
        loadChildren: () => import('./mesa/mesa.module').then(m => m.MesaModule)
      },
      {
        path: 'menu',
        canActivate: [AuthGuard],
        data: { roles : [ 5, 4]},
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)
      },
      {
        path: 'pedido',
        canActivate: [AuthGuard],
        data: { roles : [ 5, 4, 3, 2, 1]},
        loadChildren: () => import('./pedido/pedido.module').then(m => m.PedidoModule)
      },
      {
        path: 'empleado',
        canActivate: [AuthGuard],
        data: { roles : [5]},
        loadChildren: () => import('./empleado/empleado.module').then(m => m.EmpleadoModule)
      },
      {
        path: 'ticket',
        canActivate: [AuthGuard],
        data: { roles : [5, 4]},
        loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
      }
    ],
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles : [5]},
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
