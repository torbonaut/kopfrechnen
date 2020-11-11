import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageHomeComponent} from './pages/page-home/page-home.component';
import {PageGameComponent} from './pages/page-game/page-game.component';
import {PageResultComponent} from './pages/page-result/page-result.component';

const routes: Routes = [
  {
    component: PageHomeComponent,
    path: 'home'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    component: PageGameComponent,
    path: 'game'
  },
  {
    component: PageResultComponent,
    path: 'result'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
