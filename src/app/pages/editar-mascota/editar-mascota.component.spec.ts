import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMascotaComponent } from './editar-mascota.component';

describe('EditarMascotaComponent', () => {
  let component: EditarMascotaComponent;
  let fixture: ComponentFixture<EditarMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
