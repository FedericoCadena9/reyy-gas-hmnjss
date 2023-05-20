import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
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
        path: 'social-media',
        loadChildren: () => import('../social-media/social-media.module').then( m => m.SocialMediaPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
      {
        path: 'about-us',
        loadChildren: () => import('../about-us/about-us.module').then( m => m.AboutUsPageModule)
      }
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
