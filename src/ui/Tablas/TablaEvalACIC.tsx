import { ResEvalACICList } from '@/models/typesFijo';
import { ItemEvalACICList } from '@/componets/ItemEvalACICList';


interface Props {
    ResEvalsACIC: ResEvalACICList[];
    inicio: number;
}

// Adaptación del componente principal
export default function TablaEvalACIC(props: Props) {
    const { ResEvalsACIC, inicio } = props;
    return (

        <table className="border-x-2 border-b-2  hidden min-w-full text-gray-900 md:table">
            <thead className='rounded-lg text-left text-sm font-normal'>
                <tr>
                    <th scope="col" className="px-2 py-5"></th>
                    <th scope="col" className="px-5 py-5 font-medium">Fecha de Evaluación</th>
                    <th scope="col" className="px-3 py-5 font-medium">Promedio</th>
                    <th scope="col" className="px-4 py-5 font-medium">Resultado</th>
                    <th scope="col" className="px-3 py-5 font-medium">Evaluado</th>
                    <th scope="col" className="px-3 py-5 font-medium">Aplicador</th>
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
                            num={idx}
                            key={evals.id}
                            designado={inicio + idx}
                        />

                    ))
                }
            </tbody>
        </table>

    );
}
