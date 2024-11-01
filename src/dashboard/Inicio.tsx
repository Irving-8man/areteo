import ChartExporter from "@/componets/CharterExport";
import { FirstChart } from "../componets/FirstChart";


export default function Inicio() {


    return (
        <main className="min-h-full  border px-[30px] py-[30px] relative">
            <header className="sticky top-0 border bg-white py-4 z-[4]">
                <h1>Inicio</h1>
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
