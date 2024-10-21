import { PacienteRegistrado } from '@/models/types';
import { getPacientesFiltradoPaginado } from '@/services/PacienteController';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ItemPacienteList from '@/componets/ItemPacienteList';
import { usePacienteStore } from '@/store/storePacientes';

export default function TablaPacientes() {
    const [pacientesCarga, setPacientesCarga] = useState<PacienteRegistrado[]>([]);
    const pacientes = usePacienteStore((state) => state.pacientes);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const currentPage = Number(searchParams.get('page')) || 1;

    // Cada vez que cambian los searchParams, se ejecuta la búsqueda
    useEffect(() => {
        const fetchData = async () => {
            const pacientes = await getPacientesFiltradoPaginado(query, currentPage)
            setPacientesCarga(pacientes);
        };
        fetchData();
    }, [query, currentPage, pacientes]);



    return (
        <div className="mt-6 flow-root min-h-[50vh]">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50">

                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Nombre Completo
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Edad
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Fecha de Nacimiento
                                </th>

                                <th scope="col" className="px-3 py-5 font-medium">
                                    Ultima Consulta
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {pacientesCarga.length > 0 ? (
                                pacientesCarga?.map((paciente) => (
                                    <ItemPacienteList key={paciente.id} paciente={paciente}></ItemPacienteList>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                                        No hay Pacientes disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
