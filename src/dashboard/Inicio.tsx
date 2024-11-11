

export default function Inicio() {

    return (
        <main className="min-h-full">
            <header className="sticky top-0 px-[30px] bg-white border border-y-slate-300 text-black z-[2] py-3">
                <h1>Bienvenida</h1>
            </header>


            <section className="border px-[30px] py-[30px]">
                <article>
                    <p className="text-8xl">ARETEO</p>
                </article>

                <article className="mt-20">
                    <h2 className="text-2xl font-semibold">Lider de proyecto: Irving Geyler Cupul Uc</h2>
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold">Equipo</h2>
                        <ul className="list-disc">
                            <li className="text-xl">Sub-lider: Joar Ruiz Peraza</li>
                            <li className="text-xl">Desarrollo: Jesus Be hau</li>
                            <li className="text-xl">Desarrollo: Didier Tec Ezquivel</li>
                            <li className="text-xl">Desarrollo: Juan Carlos Conde </li>
                        </ul>
                    </div>

                </article>
            </section>
        </main>
    )
}

/**
 * 
 * 
 *   <section className="min-h-[100vh]">
                <div className="grid grid-cols-2 gap-[20px] relative">
                    <ChartExporter title="Primer Gráfico">
                        <FirstChart />
                    </ChartExporter>
                </div>
            </section>
 */