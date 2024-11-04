import { AREASFIJAS } from "@/InstFijoDiabetes/Const";
import { Button } from "@fluentui/react-components";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Add20Filled, ArrowLeft20Filled } from "@fluentui/react-icons";


export default function AreaResultados() {
    const { areaId } = useParams();
    const id = parseInt(areaId!);

    const area = useMemo(() => {
        return AREASFIJAS.find(a => a.id === id);
    }, [id]);

    if (!area) {
        return <div>Área no encontrada</div>;
    }

    return (
        <div>
            <section className="flex justify-between">
                <Link to="/dashboard/instrumentos/instrumentoFijo"><Button icon={<ArrowLeft20Filled />}>ACIC</Button></Link>
                {area && (
                    <Link to={`/dashboard/instrumentos/instrumentoFijo/area/${String(id)}/evaluar`}>
                        <Button appearance="primary" icon={<Add20Filled />}>Nueva Evaluación</Button>
                    </Link>
                )}
            </section>
            <section>
                {area.nombre}
                aqui esta la informacion y la lista de respuesta
            </section>
        </div>
    )
}