import { Routes } from '@angular/router';
import { ListaMascotaComponent } from './pages/lista-mascota/lista-mascota.component';
import { AgregarMascotaComponent } from './pages/agregar-mascota/agregar-mascota.component';
import { EditarMascotaComponent } from './pages/editar-mascota/editar-mascota.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'lista-mascota' },
    { path: 'lista-mascota', component: ListaMascotaComponent},
    { path: 'agregar-mascota', component: AgregarMascotaComponent},
    { path: 'editar-mascota/:id', component: EditarMascotaComponent},
    { path: '**', redirectTo: 'lista-mascota' }
];
