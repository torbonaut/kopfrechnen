import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageGameComponent } from './pages/page-game/page-game.component';
import { PageResultComponent } from './pages/page-result/page-result.component';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment.prod';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {GameState} from './store/game.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageGameComponent,
    PageResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([GameState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
