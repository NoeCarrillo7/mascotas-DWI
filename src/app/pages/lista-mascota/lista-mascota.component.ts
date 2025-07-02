import { Component } from '@angular/core';
import { MascotaService } from '../../services/mascota.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-mascota',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './lista-mascota.component.html',
  styleUrl: './lista-mascota.component.css'
})
export class ListaMascotaComponent {
  listaMascotas: any[] = [];
  mascotasFiltradas: any[] = [];
  cargando: boolean = true;
  
  filtroNombre: string = '';
  filtroTipo: string = '';
  
  tiposMascota: string[] = ['Perro', 'Gato', 'Ave', 'Reptil', 'Conejo', 'Pez', 'Roedor', 'Otro'];

  constructor(private mascotaService: MascotaService) {
    this.getMascotas();
  }

  ngOnInit(): void { }

  getMascotas(): void {
    this.cargando = true;
    this.mascotaService.getMascotas().subscribe(
      (data) => {
        this.listaMascotas = data;
        this.mascotasFiltradas = [...this.listaMascotas];
        this.cargando = false;
        console.log('Mascotas obtenidas:', this.listaMascotas);
      },
      (error) => {
        console.error('Error al obtener mascotas:', error);
        this.cargando = false;
      }
    );
  }

  aplicarFiltros(): void {
    this.mascotasFiltradas = this.listaMascotas.filter(m => 
      m.nombre?.toLowerCase().includes(this.filtroNombre.toLowerCase()) &&
      (this.filtroTipo === '' || m.tipo === this.filtroTipo)
    );
  }

  getIconoTipo(tipo: string): string {
    const iconos: {[key: string]: string} = {
      'Perro': 'fas fa-dog',
      'Gato': 'fas fa-cat',
      'Ave': 'fas fa-dove',
      'Reptil': 'fas fa-stroopwafel',
      'Conejo': 'fas fa-paw',
      'Pez': 'fas fa-fish',
      'Roedor': 'fas fa-otter',
      'Otro': 'fas fa-paw'
    };
    return iconos[tipo] || 'fas fa-paw';
  }

  eliminarMascota2(mascota: any, index: any): void {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      this.mascotaService.eliminarMascota(mascota._id).subscribe(
        (data) => {
          console.log('Mascota eliminada con éxito');
          this.listaMascotas.splice(index, 1);
          this.aplicarFiltros(); // Actualizar la lista filtrada
        },
        (error) => {
          console.error('Error al eliminar la mascota:', error);
        }
      );
    }
  }



  /*listaMascotas: any[] = [];

  constructor(private mascotaService: MascotaService) {
    this.getMascotas();
  }

  ngOnInit(): void { }

  getMascotas(): void {
    this.mascotaService.getMascotas().subscribe(
      (data) => {
        this.listaMascotas = data;
        console.log('Mascotas obtenidas:', this.listaMascotas);
      },
      (error) => {
        console.error('Error al obtener mascotas:', error);
      }
    );
  }

  eliminarMascota(id: any): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      this.mascotaService.eliminarMascota(id).subscribe(
        () => {
          console.log('Mascota eliminada con éxito');
          this.getMascotas();
        },
        (error) => {
          console.error('Error al eliminar la mascota:', error);
        }
      );
    }
  }

  eliminarMascota2(mascota: any, index: any){
    if (window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      this.mascotaService.eliminarMascota(mascota._id).subscribe(
        (data) => {
          console.log('Mascota eliminada con éxito');
          this.listaMascotas.splice(index, 1); // Actualizar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar la mascota:', error);
        }
      );
    }
  }*/

}
