import { Outlet } from 'react-router-dom';
export default function InstrumentoFijo() {
    return (
        <div>
            <Outlet /> {/* Aquí se renderizan las subrutas */}
        </div>
    )
}