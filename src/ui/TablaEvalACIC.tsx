import React, { useRef, useContext } from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';
import { ResEvalACICList } from '@/models/typesFijo';
import ItemEvalACICList from '@/componets/ItemEvalACICList';



// Contexto para manejar el top y la referencia de la tabla
const VirtualTableContext = React.createContext<{
    header: React.ReactNode;
    footer: React.ReactNode;
}>({
    header: <></>,
    footer: <></>,
});

// Componente VirtualTable que virtualiza las filas de la tabla
function VirtualTable({
    row,
    header,
    footer,
    ...rest
}: {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    row: FixedSizeListProps['children'];
} & Omit<FixedSizeListProps, 'children' | 'innerElementType'>) {
    const listRef = useRef<FixedSizeList | null>(null);

    return (
        <VirtualTableContext.Provider value={{ header, footer }}>
            <FixedSizeList
                {...rest}
                innerElementType={Inner}
                onItemsRendered={(props) => {
                    // Llamar a la callback original si existe
                    rest.onItemsRendered && rest.onItemsRendered(props);
                }}
                ref={(el) => (listRef.current = el)}
            >
                {row}
            </FixedSizeList>
        </VirtualTableContext.Provider>
    );
}



// Componente Inner, que aplica el estilo de posición a la tabla
const Inner = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
    function Inner({ children, ...rest }, ref) {
        const { header, footer } = useContext(VirtualTableContext);
        return (
            <div {...rest} ref={ref}>
                <table className="hidden min-w-full text-gray-900 md:table relative">
                    {header}
                    <tbody>{children}</tbody>
                    {footer}
                </table>
            </div>
        );
    }
);




const Header_TABLE = () => {
    return (
        <thead className='rounded-lg text-left text-sm font-normal'>
            <tr>
                <th scope="col" className="px-4 py-5 font-medium">Fecha de Evaluación</th>
                <th scope="col" className="px-3 py-5 font-medium">Promedio</th>
                <th scope="col" className="px-4 py-5 font-medium">Resultado Evaluación</th>
                <th scope="col" className="px-3 py-5 font-medium">Aplicador</th>
                <th scope="col" className="px-3 py-5 font-medium">Respondiente</th>
                <th scope="col" className="px-3 py-5 font-medium">
                    <span>Acciones</span>
                </th>
            </tr>
        </thead>
    )
}


interface Props {
    ResEvalsACIC: ResEvalACICList[];
    borrarResEval: (id: string) => void
}

// Adaptación del componente principal
export default function TablaEvalACIC(props: Props) {
    const { ResEvalsACIC, borrarResEval } = props;


    function Row({ index }: { index: number }) {
        const registro = ResEvalsACIC[index];
        return (
            <ItemEvalACICList
                ResEvalACIC={registro}
                borrarResEval={borrarResEval}
                num={index}
                key={registro.id}
            />
        );
    }


    return (
        <div className="flow-root min-h-[50vh]">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50">

                    {ResEvalsACIC.length > 0 ? (
                        <VirtualTable
                            height={400}
                            width="100%"
                            itemCount={ResEvalsACIC.length}
                            itemSize={35}
                            header={<Header_TABLE />}
                            row={({ index }) => <Row index={index} />}
                        />
                    ) : (
                        <table className="hidden min-w-full text-gray-900 md:table">
                            <thead className='rounded-lg text-left text-sm font-normal'>
                                <tr>
                                    <th scope="col" className="px-4 py-5 font-medium">Fecha de Evaluación</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Promedio</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Aplicador</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Respondiente</th>
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
