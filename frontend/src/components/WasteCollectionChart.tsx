import React, { useRef, useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import type { ChartOptions, ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartProps {
    activeRange: string;
}

const WasteCollectionChart: React.FC<ChartProps> = ({ activeRange }) => {
    const chartRef = useRef<any>(null);
    const [rerender, setRerender] = useState(false);

    // ⚙️ Trigger re-render after mount to ensure chartArea is ready for gradient
    useEffect(() => {
        const timer = setTimeout(() => setRerender(true), 50);
        return () => clearTimeout(timer);
    }, [activeRange]);

    const getLabelsForRange = (range: string) => {
        switch (range) {
            case "6 months":
                return ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
            case "1 year":
                return [
                    "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",
                    "Dec", "Jan", "Feb", "Mar", "Apr", "May",
                ];
            default:
                return ["Jun", "Jul", "Aug", "Sep"];
        }
    };

    const getDataForRange = (range: string) => {
        switch (range) {
            case "6 months":
                return [12, 18, 15, 21, 17, 20];
            case "1 year":
                return [10, 12, 18, 15, 21, 17, 20, 25, 19, 23, 18, 22];
            default:
                return [12, 18, 15, 21];
        }
    };

    const labels = getLabelsForRange(activeRange);
    const dataValues = getDataForRange(activeRange);

    const data: ChartData<"bar"> = {
        labels,
        datasets: [
            {
                label: "Waste Collected (kg)",
                data: dataValues,
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) return "#22c55e";

                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, "#71e352");
                    gradient.addColorStop(1, "#0f7a26");

                    return gradient;
                },
                borderRadius: 8,
            },
        ],
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: false },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#374151", font: { size: 12 } },
            },
            y: {
                beginAtZero: true,
                grid: { color: "#E5E7EB" },
                ticks: { color: "#6B7280", font: { size: 12 } },
            },
        },
    };

    return (
        <div className="h-[350px] mt-8">
            <Bar key={rerender.toString()} ref={chartRef} data={data} options={options} />
        </div>
    );
};

export default WasteCollectionChart;
