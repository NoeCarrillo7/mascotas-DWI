import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agregar-mascota',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './agregar-mascota.component.html',
  styleUrls: ['./agregar-mascota.component.css']
})
export class AgregarMascotaComponent {
  @ViewChild('vacunaInput') vacunaInput!: ElementRef;
  mascotaForm: FormGroup;
  enviado: boolean = false;
  mascotaTipos: string[] = ['Perro', 'Gato', 'Ave', 'Reptil', 'Conejo', 'Pez', 'Roedor', 'Otro'];
  mostrarOtroTipo: boolean = false;
  mascotaSexos: string[] = ['Macho', 'Hembra'];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private mascotasService: MascotaService
  ) {
    this.mascotaForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      raza: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(0), Validators.max(30)]],
      sexo: ['', [Validators.required]],
      peso: ['', [Validators.required, Validators.min(0)]],
      duenio: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      vacunas: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {}

  get myForm() {
    return this.mascotaForm.controls;
  }

  get vacunas(): FormArray {
    return this.mascotaForm.get('vacunas') as FormArray;
  }

  actualizarTipo(event: Event): void {
    const tipoSeleccionado = (event.target as HTMLSelectElement).value;
    this.mascotaForm.patchValue({ tipo: tipoSeleccionado });
    this.mostrarOtroTipo = tipoSeleccionado === 'Otro';

    if (!this.mostrarOtroTipo) {
      this.mascotaForm.patchValue({ tipo: tipoSeleccionado });
    }
  }

  agregarVacuna(input: HTMLInputElement): void {
    if (input.value.trim() !== '') {
      this.vacunas.push(this.formBuilder.control(input.value.trim()));
      input.value = '';
      input.focus();
    }
  }

  eliminarVacuna(index: number): void {
    this.vacunas.removeAt(index);
  }

  onSubmit() {
    this.enviado = true;
    
    if (!this.mascotaForm.valid) {
      console.log('Formulario no válido');
      return false;
    } else {
      return this.mascotasService.agregarMascota(this.mascotaForm.value).subscribe({
        complete: () => {
          console.log('Mascota agregada correctamente');
          this.ngZone.run(() => this.router.navigateByUrl('/lista-mascota'));
        },
        error: (error) => {
          console.error('Error al agregar mascota:', error);
        }
      });
    }
  }
}