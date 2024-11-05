import { ResEvalACICList } from '@/models/typesFijo';
import ItemEvalACICList from '@/componets/ItemEvalACICList';





interface Props {
    ResEvalsACIC: ResEvalACICList[];
    borrarResEval: (id: string) => void
}

// Adaptación del componente principal
export default function TablaEvalACIC(props: Props) {
    const { ResEvalsACIC, borrarResEval } = props;


    return (
        <div className="flow-root min-h-[50vh]">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50">

                    {ResEvalsACIC.length > 0 ? (
                        <table className="hidden min-w-full text-gray-900 md:table">
                            <thead className='rounded-lg text-left text-sm font-normal'>
                                <tr>
                                    <th scope="col" className="px-4 py-5 font-medium">Fecha de Evaluación</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Promedio</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Aplicador</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Evaluado</th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        <span>Acciones</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    ResEvalsACIC.map((evals, idx) => (
                                        <ItemEvalACICList
                                            ResEvalACIC={evals}
                                            borrarResEval={borrarResEval}
                                            num={idx}
                                            key={evals.id}
                                        />

                                    ))
                                }
                            </tbody>
                        </table>
                    ) : (
                        <table className="hidden min-w-full text-gray-900 md:table">
                            <thead className='rounded-lg text-left text-sm font-normal'>
                                <tr>
                                    <th scope="col" className="px-4 py-5 font-medium">Fecha de Evaluación</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Promedio</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Aplicador</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Evaluado</th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        <span>Acciones</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                                        No hay evaluaciones hechas
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
