import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'tips',
        loadChildren: () =>
          import('../tips/tips.module').then((m) => m.TipsPageModule),
      },
      {
        path: 'tip/:id',
        loadChildren: () =>
          import('../tip/tip.module').then((m) => m.TipPageModule),
      },
      {
        path: 'recetas',
        loadChildren: () =>
          import('../recetas/recetas.module').then((m) => m.RecetasPageModule),
      },
      {
        path: 'receta/:id',
        loadChildren: () =>
          import('../receta/receta.module').then((m) => m.RecetaPageModule),
      },
      {
        path: 'social-media',
        loadChildren: () =>
          import('../social-media/social-media.module').then(
            (m) => m.SocialMediaPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
      {
        path: 'about-us',
        loadChildren: () =>
          import('../about-us/about-us.module').then(
            (m) => m.AboutUsPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'phone-numbers',
        loadChildren: () =>
          import('../phone-numbers/phone-numbers.module').then(
            (m) => m.PhoneNumbersPageModule
          ),
      },
      {
        path: 'ecommerce',
        loadChildren: () =>
          import('../ecommerce/ecommerce.module').then(
            (m) => m.EcommercePageModule
          ),
      },
      {
        path: 'centro-fugas',
        loadChildren: () =>
          import('../centro-fugas/centro-fugas.module').then(
            (m) => m.CentroFugasPageModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('../orders/orders.module').then((m) => m.OrdersPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
