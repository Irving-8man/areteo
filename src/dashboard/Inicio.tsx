import ChartExporter from "@/componets/CharterExport";
import { FirstChart } from "../componets/FirstChart";



export default function Inicio() {

    return (
        <main className="min-h-full ">
            <header className="sticky top-0 px-[30px] bg-white border border-y-slate-300 text-black z-[2] py-3">
                <h1>Datos Generales</h1>
            </header>
            <section className="min-h-[100vh]">
                <div className="grid grid-cols-2 gap-[20px] relative">
                    <ChartExporter title="Primer Gráfico">
                        <FirstChart />
                    </ChartExporter>
                </div>
            </section>
        </main>
    )
}
