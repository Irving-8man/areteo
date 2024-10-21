import { RegistroMedicoDB } from '@/models/types';
import { getRegistrosPaciente } from '@/services/RegistrosMedicoController';
import { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';

interface Props {
    id: string | undefined;
}


export default function TablaRegistros(props: Props) {
    const [registrosCarga, setRegistrosCarga] = useState<RegistroMedicoDB[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (props.id) {
                const registros = await getRegistrosPaciente(props.id)
                setRegistrosCarga(registros);
            }
        };
        fetchData();
    }, [props.id]);


    // Componente para cada fila de la tabla
    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const registro = registrosCarga[index];
        return (
            <tr style={style}>
                <td className="px-4 py-4">{registro.fechaDiagnostico}</td>
                <td className="px-4 py-4">{registro.edad}</td>
                <td className="px-4 py-4">{registro.peso}</td>
                <td className="px-4 py-4">{registro.estatura}</td>
            </tr>
        );
    };


    return (
        <div className="mt-6 flow-root min-h-[50vh]">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50">

                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Fecha de Registro
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Edad
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Peso
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Antecedentes Familiares
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">

                            {registrosCarga.length > 0 ? (
                                <List
                                    height={400}
                                    itemCount={registrosCarga.length}
                                    itemSize={35}
                                    width="100%" 
                                >
                                    {Row}
                                </List>
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                                        No hay registros disponibles.
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
