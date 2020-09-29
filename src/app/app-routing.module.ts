import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayPanelComponent } from './display-panel/display-panel.component';

const routes: Routes = [
  {path: '', redirectTo: '/article/-1', pathMatch: 'full'},
  {path: 'article/edit/:articleId', component: DisplayPanelComponent},
  {path: "article/:articleId", component: DisplayPanelComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
