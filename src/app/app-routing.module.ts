import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
  // },
 // { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' }
 { path: '', redirectTo: 'auth', pathMatch: 'full' },
 { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule'},
 { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
 { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
