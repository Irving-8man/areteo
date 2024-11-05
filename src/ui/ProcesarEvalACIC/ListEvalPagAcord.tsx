import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import { ResEvalACICList } from "@/models/typesFijo";
import { ChevronDown24Filled, ClipboardTaskListLtr20Regular } from "@fluentui/react-icons"

interface ListEvaluacionesAcordeonProps {
    evaluaciones: ResEvalACICList[];
}

const ListEvalPagAcord: React.FC<ListEvaluacionesAcordeonProps> = ({ evaluaciones }) => {
    const evaluacionesPorPagina = 10;

    const paginas = React.useMemo(() => {
        const totalPaginas = Math.ceil(evaluaciones.length / evaluacionesPorPagina);
        return Array.from({ length: totalPaginas }, (_, index) =>
            evaluaciones.slice(index * evaluacionesPorPagina, (index + 1) * evaluacionesPorPagina)
        );
    }, [evaluaciones]);

    if (evaluaciones.length === 0) {
        return <p>No se encontraron resultados.</p>;
    }

    return (
        <Accordion.Root className="flex flex-col gap-6" type="single" collapsible>
            {paginas.map((pagina, index) => {
                const inicio = index * evaluacionesPorPagina + 1;
                const fin = Math.min((index + 1) * evaluacionesPorPagina, evaluaciones.length);

                return (
                    <Accordion.Item className="overflow-hidden AccordionItem" value={`item-${index}`} key={index}>
                        <AccordionTrigger className="font-semibold text-base"> <p className="inline-flex items-center gap-1"><ClipboardTaskListLtr20Regular />{`Evaluaciones: ${inicio} - ${fin}`}</p></AccordionTrigger>
                        <AccordionContent className="">
                            {pagina.map((evaluation) => (

                                <div key={evaluation.id} className="grid grid-cols-4">
                                    <p><strong>Fecha:</strong> {evaluation.fechaEvaluacion}</p>
                                    <p><strong>Promedio:</strong> {evaluation.promedio}</p>
                                    <p><strong>Aplicador:</strong> {evaluation.aplicador}</p>
                                    {/* Agrega más detalles si es necesario */}
                                </div>
                            ))}
                        </AccordionContent>
                    </Accordion.Item>
                );
            })}
        </Accordion.Root>
    );
};

// Componentes auxiliares para el trigger y el contenido del acordeón
const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex ">
        <Accordion.Trigger
            className={clsx("flex justify-between items-center AccordionTrigger", className)}
            {...props}
            ref={forwardedRef}
        >
            {children}
            <span className="inline-block acod"><ChevronDown24Filled className="AccordionChevron" aria-hidden /></span>
        </Accordion.Trigger>
    </Accordion.Header>
));


const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
        className={clsx("overflow-hidden text-base AccordionContent", className)}
        {...props}
        ref={forwardedRef}
    >
        <div className="">{children}</div>
    </Accordion.Content>
));

export default ListEvalPagAcord;
