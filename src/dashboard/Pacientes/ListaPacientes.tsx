import Search from "@/componets/Search"
import Paginacion from "@/ui/Paginacion"
import PacientesTabla from "@/ui/Table"

export default function ListaPacientes() {
    return (
        <div>
            <div>
                <Search placeholder="Buscando ..." />
            </div>

            <div>
                <PacientesTabla />
                <div>
                <Paginacion />
                </div>
            </div>
        </div>
    )
}