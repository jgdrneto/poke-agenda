import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearcherComponent } from './searcher/searcher.component';
import { PokeAgendaComponent } from './poke-agenda/poke-agenda.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SearcherComponent,
    PokeAgendaComponent,
    PokemonComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [PokeAgendaComponent]
})
export class AppModule { }
