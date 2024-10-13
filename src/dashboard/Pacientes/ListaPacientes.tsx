import Search from "@/componets/Search"
import PacientesTabla from "@/ui/Table"

export default function ListaPacientes() {
    return (
        <div>
            <div>
                <Search placeholder="Buscando ..." />
            </div>

            <div>
                Tabla

                <PacientesTabla />
            </div>
        </div>
    )
}