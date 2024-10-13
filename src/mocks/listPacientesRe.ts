import { PacienteRegistrado } from "@/models/types";

export const mockpacientesRegis: PacienteRegistrado[] = [
    {
      id: '1a2b3c4d',
      primerNombre: 'Juan',
      segundoNombre: 'Carlos',
      apellidoPaterno: 'Gómez',
      apellidoMaterno: 'Martínez',
      fechaNacimiento: new Date('1990-05-15'),
      fechaRegistro: new Date('2024-10-01')
    },
    {
      id: '2e3f4g5h',
      primerNombre: 'María',
      segundoNombre: 'Fernanda',
      apellidoPaterno: 'López',
      apellidoMaterno: 'Hernández',
      fechaNacimiento: new Date('1985-12-02'),
      fechaRegistro: new Date('2024-09-28')
    },
    {
      id: '3i4j5k6l',
      primerNombre: 'José',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'Rodríguez',
      fechaNacimiento: new Date('1978-03-22'),
      fechaRegistro: new Date('2024-10-02')
    },
    {
      id: '4m5n6o7p',
      primerNombre: 'Ana',
      segundoNombre: 'Lucía',
      apellidoPaterno: 'Ramírez',
      apellidoMaterno: 'Cruz',
      fechaNacimiento: new Date('1995-07-19'),
      fechaRegistro: new Date('2024-09-30')
    },
    {
      id: '5q6r7s8t',
      primerNombre: 'Ricardo',
      apellidoPaterno: 'Sánchez',
      fechaNacimiento: new Date('1982-01-10'),
      fechaRegistro: new Date('2024-09-25')
    }
  ];
  