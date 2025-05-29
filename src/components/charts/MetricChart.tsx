import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Label,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { Funnel } from "lucide-react";
import { Context } from "../data/context";

interface MetricChartProps {
  title: string;
  queryKey: (string | number)[];
  queryFn: (
    filter: "yearly" | "monthly" | "weekly"
  ) => Promise<Record<string, any[]>>;
  valueKey: string;
  labelKey: (item: Record<string, any>) => string;
  yAxisLabel: string;
  color: string;
  dataKey?: string; 
}


const MetricChart = ({
  title,
  queryKey,
  queryFn,
  valueKey,
  labelKey,
  yAxisLabel,
  color,
  dataKey = "data",
}: MetricChartProps) => {
  const { timeFilter, setTimeFilter } = useContext(Context);

  const { data, isLoading, isError } = useQuery({
    queryKey: [...queryKey, timeFilter],
    queryFn: () => queryFn(timeFilter),
    staleTime: 1000 * 60 * 1,
  });

  const chartData = useMemo(() => {
    const rawData = data?.[dataKey] || [];
    return rawData.map((item: any) => ({
      label: labelKey(item),
      value: item[valueKey],
    }));
  }, [data, labelKey, valueKey, dataKey]);

  if (isLoading) return <p>Loading chart...</p>;
  if (isError) return <p>Error loading chart data.</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-blue-900">{title}</h2>
        <div className="relative font-medium">
          <select
            value={timeFilter}
            onChange={(e) =>
              setTimeFilter(e.target.value as "yearly" | "monthly" | "weekly")
            }
            className="text-base"
          >
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
          <div className="absolute inset-y-0 right-1 flex items-center p-2">
            <Funnel className="h-5 w-5" />
          </div>
        </div>
      </div>

      <hr className="mb-4" />

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label">
            <Label value={timeFilter} offset={-2} position="insideBottom" />
          </XAxis>
          <YAxis
            label={{
              value: yAxisLabel,
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
           fill={color}
         fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricChart;
