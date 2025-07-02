import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from '../../models/mascota';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-mascota',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './editar-mascota.component.html',
  styleUrls: ['./editar-mascota.component.css']
})
export class EditarMascotaComponent {
  EditarMascotaForm: FormGroup;
  enviado: boolean = false;
  mascotaTipos: string[] = ['Perro', 'Gato', 'Ave', 'Reptil', 'Conejo', 'Pez', 'Roedor', 'Otro'];
  mostrarOtroTipo: boolean = false;
  mascotaData: Mascota[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private mascotasService: MascotaService,
    private actRouter: ActivatedRoute,
  ) {
    this.EditarMascotaForm = this.formBuilder.group({
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

  ngOnInit(): void {
    const id = this.actRouter.snapshot.paramMap.get('id');
    if (id) {
      this.getMascota(id);
    } else {
      console.error('ID de mascota no encontrado en la ruta');
    }
  }

  actualizarTipo(event: Event): void {
    const tipoSeleccionado = (event.target as HTMLSelectElement).value;
    this.EditarMascotaForm.patchValue({ tipo: tipoSeleccionado });
    this.mostrarOtroTipo = tipoSeleccionado === 'Otro';

    if (!this.mostrarOtroTipo) {
      this.EditarMascotaForm.patchValue({ tipo: tipoSeleccionado });
    }
  }

  get vacunas(): FormArray {
    return this.EditarMascotaForm.get('vacunas') as FormArray;
  }

  actualizarVacuna(input: HTMLInputElement): void {
    this.vacunas.push(this.formBuilder.control(input.value, Validators.required));
    input.value = '';
  }

  eliminarVacuna(index: number): void {
    this.vacunas.removeAt(index);
  }

  get myForm() {
    return this.EditarMascotaForm.controls;
  }

  getMascota(id: any) {
    this.mascotasService.getMascota(id).subscribe({
      next: (data) => {
        this.EditarMascotaForm.patchValue({
          nombre: data.nombre,
          tipo: data.tipo,
          raza: data.raza,
          edad: data.edad,
          sexo: data.sexo,
          peso: data.peso,
          duenio: data.duenio,
          telefono: data.telefono
        });
        const vacunasFormArray = this.EditarMascotaForm.get('vacunas') as FormArray;
        vacunasFormArray.clear();
        if (data.vacunas?.length) {
          data.vacunas.forEach((vacuna: string) => {
            vacunasFormArray.push(this.formBuilder.control(vacuna, Validators.required));
          });
        }
      },
      error: (error) => {
        console.error('Error al obtener la mascota:', error);
      }
    });
    
  }




  onSubmit() {
    this.enviado = true;
    if (!this.EditarMascotaForm.valid) {
      console.log('Formulario no válido');
      return false;
    } else {
      if(window.confirm('¿Estás seguro que deseas actualizar esta mascota?')) {
        const id = this.actRouter.snapshot.paramMap.get('id');
        return this.mascotasService.actualizarMascota(id, this.EditarMascotaForm.value).subscribe({
          complete: () => {
            console.log('Mascota actualizada correctamente');
            this.router.navigateByUrl('/lista-mascota');
          },
          error: (error) => {
            console.error('Error al actualizar mascota:', error);
          }
        });
      } else { 
        return false; 
      }
    }
  }
}