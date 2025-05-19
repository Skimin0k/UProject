// shared/ui/TemperatureChart.tsx
import React from 'react'
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

type TemperatureDataPoint = {
    x: string | number;
    y: number;
};

interface TemperatureChartProps {
    /** Массив точек данных, упорядоченный по времени */
    data: TemperatureDataPoint[];

    /** Высота графика (px) */
    height?: number;
    width?: number;
    xKeyDataLabel?: string;

    // Вывод данных при наведении: то, что по оси x
    labelFormatter: (value: string) => string;

    // Вывод данных при наведении: [значение, которое будет отображаться; как оно будет подписано]
    formatter: (value: any, name: any) => ([string, string])
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({
    data,
    height = 300,
    width = 300,
    xKeyDataLabel,
    labelFormatter,
    formatter
}) => {

    return (
        <div className="w-full">
            <ResponsiveContainer width={width} height={height}>
                <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xKeyDataLabel || 'x'} tick={{ fontSize: 12 }} />
                    <Tooltip labelFormatter={labelFormatter} formatter={formatter} />
                    <YAxis/>
                    <Line
                        type="monotone"
                        dataKey={'y'}
                        stroke="#8884d8"
                        dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
