"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
  RectangleProps,
} from "recharts";

const data = [
  { day: "Mon", value: 300 },
  { day: "Tue", value: 450 },
  { day: "Wed", value: 250 },
  { day: "Thu", value: 400 },
  { day: "Fri", value: 350 },
  { day: "Sat", value: 600 },
  { day: "Sun", value: 500 },
];

export default function ScanBarChart() {
  return (
    <div className="w-full h-[300px] sm:h-[400px]">
      <ResponsiveContainer width="100%" height="100%" > 
        <BarChart data={data}
         margin={{ top: 0, right: 0, bottom: 0, left: -20 }}

         >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff6535" stopOpacity={0.2} />
              <stop offset="40%" stopColor="#F96D37" stopOpacity={0.8} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={{ fill: "#666" }} />
          <YAxis tick={{ fill: "#666" }} domain={[0, 650]} />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            shape={<StripedBar />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const StripedBar = (props: RectangleProps) => {
  const { x, y, width, height } = props;
  const stripeHeight = 5;
  const stripeCount = 5;
  const stripeGap = 3;

  return (
    <g>
      <Rectangle {...props} fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
      {[...Array(stripeCount)].map((_, i) => (
        <rect
          key={i}
          x={x}
        //   y={y + i * (stripeHeight + stripeGap)}
          width={width}
          height={stripeHeight}
          fill="white"
          opacity={0.2}
        />
      ))}
    </g>
  );
};
