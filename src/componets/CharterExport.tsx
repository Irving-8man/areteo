import React, { useCallback, useRef } from 'react';
import { toJpeg } from 'html-to-image';
import { Button } from "@fluentui/react-components";

interface ChartExporterProps {
    title: string;
    children: React.ReactNode;
}

const ChartExporter: React.FC<ChartExporterProps> = ({ title, children }) => {
    const ref = useRef<HTMLDivElement>(null);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return;
        }

        toJpeg(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `${title}.jpg`; // Usa el título como nombre de archivo
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [ref, title]);

    return (
        <div>
            <div ref={ref} className="bg-white">
                {children} {/* Renderiza los gráficos que se pasen como children */}
            </div>
            <Button onClick={onButtonClick} appearance="outline">Guardar como JPG</Button>
        </div>
    );
};

export default ChartExporter;
