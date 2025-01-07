import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/ui/chart"
import { Card, CardFooter, CardHeader } from "@fluentui/react-components"
import { useEffect, useState } from "react"



const chartData = [
    { month: "1", desktop: 186 },
    { month: "2", desktop: 305 },
    { month: "3", desktop: 237 },
    { month: "4", desktop: 273 },
    { month: "5", desktop: 209 },
    { month: "6", desktop: 214 },
    { month: "7", desktop: 214 },
    { month: "8", desktop: 214 },
    { month: "9", desktop: 214 },
    { month: "10", desktop: 214 },
    { month: "11", desktop: 214 }
]
const chartConfig = {
    desktop: {
        label: "Respuestas",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig



export function ChartRadar() {
    return (
        <Card>
            <CardHeader className="items-center pb-4">
                <h3>Radar Chart</h3>
                <p>
                    Showing total visitors for the last 6 months
                </p>
            </CardHeader>
            <div className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="month" />
                        <PolarGrid />
                        <Radar
                            dataKey="desktop"
                            fill="var(--color-desktop)"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ChartContainer>
            </div>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    January - June 2024
                </div>
            </CardFooter>
        </Card>
    )
}
interface RadarData {
    punt: string;
    frec: number;
}

interface ChartRadarProps {
    data: RadarData[] | null; // Acepta datos o null
    componentName: string;
    componentOrder: number;
}

export const ChartRadarED: React.FC<ChartRadarProps> = ({ data, componentName, componentOrder }) => {
    const [dataS, setDataS] = useState<RadarData[]>(Array.from({ length: 12 }, (_, index) => ({
        punt: index.toString(),
        frec: 0, 
    })));

    useEffect(() => {
        if (data) {
            const updatedData = Array.from({ length: 12 }, (_, index) => {
                const foundData = data.find(item => parseInt(item.punt) === index);
                return {
                    punt: index.toString(),
                    frec: foundData ? foundData.frec : 0, // Si no hay datos, asigna 0
                };
            });
            setDataS(updatedData);
        }
    }, [data]); 

    const chartConfig = {
        frec: {
            label: "Frecuencia",
            color: "hsl(var(--chart-1))",
        },
    };

    return (
        <Card>
            <CardHeader className="items-center pb-4">
                <h3>{`Radar Chart - Componente ${componentOrder}`}</h3>
                <p>{`Frecuencias de puntuación para ${componentName}`}</p>
            </CardHeader>
            <div className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadarChart data={dataS}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="punt" /> {/* Usa las puntuaciones como eje */}
                        <PolarGrid />
                        <Radar
                            dataKey="frec" // Frecuencia de cada puntuación
                            fill="var(--color-desktop)"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ChartContainer>
            </div>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    {`${componentOrder}-Resultados para ${componentName}`}
                </div>
            </CardFooter>
        </Card>
    );
};