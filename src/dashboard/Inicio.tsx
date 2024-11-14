

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

                <article className="mt-10">
                    <p className="max-w-[70ch] text-lg">Apoyo para especialistas y personal de la salud en la gestión de pacientes e instrumentos para la evaluación y control.</p>
                </article>

                <article className="mt-20">
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold">Desarrollo</h2>
                        <ul className="list-disc text-base">
                            <li className="text-base">Lider de proyecto: Br. Irving Geyler Cupul Uc</li>
                            <li className="text-base">Br. Joar Ruiz Peraza</li>
                            <li className="">Br. Jesus Be hau</li>
                            <li className="">Br. Didier Tec Ezquivel</li>
                            <li className="">Br. Juan Carlos Conde </li>
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