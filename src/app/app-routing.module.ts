import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from './guards/intro.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canLoad: [IntroGuard, AutoLoginGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'intro',
    loadChildren: () =>
      import('./intro/intro.module').then((m) => m.IntroPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'social-media',
    loadChildren: () =>
      import('./social-media/social-media.module').then(
        (m) => m.SocialMediaPageModule
      ),
  },
  {
    path: 'tips',
    loadChildren: () =>
      import('./tips/tips.module').then((m) => m.TipsPageModule),
  },
  {
    path: 'tip/:id',
    loadChildren: () => import('./tip/tip.module').then((m) => m.TipPageModule),
  },
  {
    path: 'recetas',
    loadChildren: () =>
      import('./recetas/recetas.module').then((m) => m.RecetasPageModule),
  },
  {
    path: 'receta',
    loadChildren: () =>
      import('./receta/receta.module').then((m) => m.RecetaPageModule),
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'email-sent',
    loadChildren: () => import('./email-sent/email-sent.module').then( m => m.EmailSentPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'phone-numbers',
    loadChildren: () => import('./phone-numbers/phone-numbers.module').then( m => m.PhoneNumbersPageModule)
  },
  {
    path: 'ecommerce',
    loadChildren: () => import('./ecommerce/ecommerce.module').then( m => m.EcommercePageModule)
  },
  {
    path: 'centro-fugas',
    loadChildren: () => import('./centro-fugas/centro-fugas.module').then( m => m.CentroFugasPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
