import { AREASFIJAS } from "@/InstFijoDiabetes/Const";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export default function AreaEvaluacion() {
    const { areaId } = useParams();
    const id = parseInt(areaId!);

    const area = useMemo(() => {
        return AREASFIJAS.find(a => a.id === id);
    }, [id]);

    if (!area) {
        return <div>Área no encontrada</div>;
    }

    return (
        <section>
            AreaEvaluacion de area {area.id}
        </section>
    )
}