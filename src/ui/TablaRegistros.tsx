import { RegistroMedicoList } from '@/models/types';
import { getRegistrosPaciente } from '@/services/RegistrosMedicoController';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';
import ItemRegistroList from '@/componets/ItemRegistroList';



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

interface Props {
    id: string | undefined;
}


const Header_TABLE = () => {
    return (
        <thead className='rounded-lg text-left text-sm font-normal'>
            <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Fecha de Registro</th>
                <th scope="col" className="px-3 py-5 font-medium">Edad</th>
                <th scope="col" className="px-3 py-5 font-medium">Peso</th>
                <th scope="col" className="px-3 py-5 font-medium">Antecedentes Familiares</th>
                <th scope="col" className="px-3 py-5 font-medium">
                    <span>Acciones</span>
                </th>
            </tr>
        </thead>
    )
}

// Adaptación del componente principal
export default function TablaRegistros(props: Props) {
    const [registrosCarga, setRegistrosCarga] = useState<RegistroMedicoList[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (props.id) {
                const registros = await getRegistrosPaciente(props.id); // Suponiendo que esta función obtiene los datos
                setRegistrosCarga(registros);
            }
        };
        fetchData();
    }, [props.id]);

    // Componente Row que renderiza cada fila de la tabla
    function Row({ index }: { index: number; }) {
        const registro = registrosCarga[index];
        return (
            <ItemRegistroList registro={registro} key={index} />
        );
    }


    return (
        <div className="mt-6 flow-root min-h-[50vh]">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50">


                    {registrosCarga.length > 0 ? (
                        <VirtualTable
                            height={400}
                            width="100%"
                            itemCount={registrosCarga.length}
                            itemSize={35}
                            header={<Header_TABLE />}
                            row={({ index }) => <Row index={index} />}
                        />
                    ) : (
                        <table className="hidden min-w-full text-gray-900 md:table">
                            <thead className='rounded-lg text-left text-sm font-normal'>
                                <tr>
                                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Fecha de Registro</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Edad</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Peso</th>
                                    <th scope="col" className="px-3 py-5 font-medium">Antecedentes Familiares</th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        <span></span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                                        No hay Registros Medicos disponibles.
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