import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AboutUsComponent} from './pages/about/about-us.component';
import {Error404Component} from './pages/errors/e404/error404.component';
import {PrivacyComponent} from './pages/privacy/privacy.component';
import {ContactComponent} from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth-module').then(m => m.AuthModule),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./modules/blog/blog-module').then(m => m.BlogModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin-module').then(m => m.AdminModule),
  }
];
