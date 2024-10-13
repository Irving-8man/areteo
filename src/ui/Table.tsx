import { PacienteRegistrado } from '@/models/types';
import { getPacientesFiltradoPaginado } from '@/services/PacienteController';
import { Button } from '@fluentui/react-components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';



export default function PacientesTabla() {
    const [pacientes, setPacientes] = useState<PacienteRegistrado[]>([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const currentPage =  1;

    // Cada vez que cambian los searchParams, se ejecuta la búsqueda
    useEffect(() => {
        const fetchData = async () => {
            const pacientes = await getPacientesFiltradoPaginado(query,1)
            setPacientes(pacientes); // Para ver los datos en la consola
        };

        fetchData();
    }, [query, currentPage]);



    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Nombre
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    apellidoPaterno
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Amount
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Date
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Status
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                        {pacientes?.map((paciente) => (
                                <tr
                                    key={paciente.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex items-center gap-3">
                                            <p>{paciente.primerNombre}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {paciente.apellidoPaterno}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        pero la
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        aprendia tanto
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        Estadtus
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <Button>Hola</Button>
                                            <Button>Como estas</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
