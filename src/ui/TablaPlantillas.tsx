import ItemPlantilla from '@/componets/ItemPlantilla';
import { PlantillaListDB } from '@/models/types';

interface TablaPlantillas {
    plantillasCarga: PlantillaListDB[];
    onDelete: (id:string) => void
}

export default function TablaPlantillas({plantillasCarga,onDelete}:TablaPlantillas) {
    
    return (
        <div className="mt-6 flow-root min-h-[50vh]">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50">

                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium">
                                    Nombre
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Descripción
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Autor
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Adaptación Por ...
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Fecha de Modificación
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {plantillasCarga.length > 0 ? (
                                plantillasCarga?.map((plantilla) => (
                                    <ItemPlantilla key={plantilla.id} plantilla={plantilla} delete={onDelete} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                                        No hay Plantillas disponibles.
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
