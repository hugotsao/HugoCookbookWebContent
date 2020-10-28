import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { DisplayPanelComponent } from './display-panel/display-panel.component';
import { ArticleComponent } from './article/article.component';
import { MarkdownPipe } from './markdown.pipe';
import { EditFormComponent } from './edit-form/edit-form.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LeftPanelComponent,
    DisplayPanelComponent,
    ArticleComponent,
    MarkdownPipe,
    EditFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
