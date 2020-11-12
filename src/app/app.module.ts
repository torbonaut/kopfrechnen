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
import { ScoreBoardComponent } from './components/score-board/score-board.component';
import { TermComponent } from './components/term/term.component';
import { ResultPadComponent } from './components/result-pad/result-pad.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    PageGameComponent,
    PageResultComponent,
    ScoreBoardComponent,
    TermComponent,
    ResultPadComponent
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
    MatButtonToggleModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
