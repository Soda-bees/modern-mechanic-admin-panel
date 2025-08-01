"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 500 },
  { month: "Mar", value: 100 },
  { month: "Apr", value: 300 },
  { month: "May", value: 450 },
  { month: "June", value: 350 },
  { month: "July", value: 300 },
  { month: "Aug", value: 200 },
  { month: "Sept", value: 310 },
  { month: "Oct", value: 600 },
  { month: "Nov", value: 120 },
  { month: "Dec", value: 320 },
];

export default function LineChartComponent() {
  return (
    <div className="w-full h-[300px] sm:h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 0, bottom: 0, left: -25, right: 0 }}
        >
          <CartesianGrid strokeDasharray="5 5" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#F97316"
            strokeWidth={3}
            dot={false}
          />
          <ReferenceDot
            x="July"
            y={300}
            r={6}
            fill="#F97316"
            stroke="white"
            strokeWidth={2}
          />
          <ReferenceLine x="July" stroke="#F97316" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
