import { FirstChart } from "../componets/FirstChart";
import{ useCallback, useRef } from 'react';
import { toJpeg} from 'html-to-image';
import { Button } from "@fluentui/react-components";


/*

import { SecondChart } from "../componets/SecondChar";
import { ThreChart } from "../componets/ThreChart";
import { FourChart } from "../componets/FourChart";*/

export default function Inicio() {
    const ref = useRef<HTMLDivElement>(null)

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toJpeg(ref.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'my-image-name.jpg'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])


    return (
        <main className="min-h-full border-orange-600 border px-[30px] py-[30px] relative">
            <header className="sticky top-0 border-orange-600 border  bg-transparent py-4 z-[4]">
                <h1>Inicio</h1>
            </header>
            <section className="border-pink-500 border min-h-[100vh]">
                <div className="grid grid-cols-2 gap-[20px]">
                     {/* DOM nodes you want to convert to PNG */}
                    <div ref={ref} className="bg-white">
                        <FirstChart />
                    </div>
                </div>

                <Button onClick={onButtonClick} appearance="primary">Guardar como jpg</Button>
            </section>
        </main>
    )
}
