import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeAgendaComponent } from './poke-agenda.component';

describe('PokeAgendaComponent', () => {
  let component: PokeAgendaComponent;
  let fixture: ComponentFixture<PokeAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
