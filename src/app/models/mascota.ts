export class Mascota {
    nombre!: string;
    tipo!: string;
    //tipo!: 'Perro' | 'Gato' | 'Ave' | 'Reptil' | 'Conejos' | 'Pez' | 'Roedores' | 'Otro';
    raza!: string;
    edad!: number;
    sexo!: string; // 'Macho' | 'Hembra';
    peso!: number;
    duenio!: string;
    telefono!: string;
    vacunas!: string[];
}