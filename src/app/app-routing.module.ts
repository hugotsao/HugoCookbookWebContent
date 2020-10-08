import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';


const routes: Routes = [
  {path: '', redirectTo: '/article/1', pathMatch: 'full'},
  {path: 'article/edit/:articleId', component: ArticleComponent},
  {path: "article/:articleId", component: ArticleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
