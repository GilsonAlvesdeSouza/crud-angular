import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TopoComponent} from './shared/components/topo/topo.component';
import {RodapeComponent} from './shared/components/rodape/rodape.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MaterialModule} from './shared/material/material.module';
import {FilmesModule} from './filmes/filmes.module';
import {MAT_DATE_LOCALE} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    FilmesModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
