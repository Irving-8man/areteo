import React, { useCallback, useRef } from 'react';
import { toBlob } from 'html-to-image';
import { Button } from "@fluentui/react-components";
import { dialog } from '@tauri-apps/api';
import { writeBinaryFile, BaseDirectory } from '@tauri-apps/api/fs';

interface ChartExporterProps {
    title: string;
    children: React.ReactNode;
}

const ChartExporter: React.FC<ChartExporterProps> = ({ title, children }) => {
    const ref = useRef<HTMLDivElement>(null);

    const onButtonClick = useCallback(async () => {
        if (ref.current === null) {
            return;
        }

        try {
            const blob = await toBlob(ref.current);
            if (blob) {
                const arrayBuffer = await blob.arrayBuffer();
                const selectedPath = await dialog.save({
                    defaultPath: `${BaseDirectory.Desktop}/${title}.jpg`,
                    filters: [{
                        name: 'JPG Files',
                        extensions: ['jpg']
                    }]
                });

                if (selectedPath) {
                    // Guarda la imagen en el directorio seleccionado
                    await writeBinaryFile(selectedPath, new Uint8Array(arrayBuffer));
                    alert('Imagen guardada con éxito en: ' + selectedPath);
                }
            }
        } catch (err) {
            console.error('Error al exportar la imagen:', err);
        }
    }, [ref, title]);

    return (
        <div className='inline-flex flex-col items-start'>
            <div ref={ref} className="bg-white inline-flex">
                {children} 
            </div>
            <Button onClick={onButtonClick} appearance="transparent">Guardar como JPG</Button>
        </div>
    );
};

export default ChartExporter;
