import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMascotaComponent } from './lista-mascota.component';

describe('ListaMascotaComponent', () => {
  let component: ListaMascotaComponent;
  let fixture: ComponentFixture<ListaMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
