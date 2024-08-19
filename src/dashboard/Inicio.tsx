import { FirstChart } from "../componets/FirstChart";
import { SecondChart } from "../componets/SecondChar";
import { ThreChart } from "../componets/ThreChart";
import { FourChart } from "../componets/FourChart";

export default function Inicio() {
    return(
        <main className="min-h-full border-orange-600 border px-[30px] py-[30px] relative">
            <header className="sticky top-0 border-orange-600 border  bg-transparent py-4 z-[4]">
                <h1>Inicio</h1>
            </header>
            <section className="border-pink-500 border min-h-[100vh]">
                <div className="grid grid-cols-2 gap-[20px]">
                    <FirstChart />
                    <SecondChart />
                    <ThreChart />
                    <FourChart />
                </div>
            </section>
        </main>
    )
}