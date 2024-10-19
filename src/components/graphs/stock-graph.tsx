"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  open: {
    label: "Open Price",
    color: "hsl(var(--chart-1))",
  },
  high: {
    label: "High Price",
    color: "hsl(var(--chart-2))",
  },
  low: {
    label: "Low Price",
    color: "hsl(var(--chart-3))",
  },
  close: {
    label: "Close Price",
    color: "hsl(var(--chart-4))",
  },
};

const StockChart = ({ stockData }: { stockData: any }) => {
  const [activePrices, setActivePrices] = React.useState<
    (keyof typeof chartConfig)[]
  >(["close"]);

  const togglePrice = (price: keyof typeof chartConfig) => {
    setActivePrices((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nabil Bank Limited (NABIL)</CardTitle>
        <CardDescription className="space-x-4">
          {Object.entries(chartConfig).map(([key, config]) => (
            <Button
              key={key}
              variant={
                activePrices.includes(key as keyof typeof chartConfig)
                  ? "default"
                  : "outline"
              }
              onClick={() => togglePrice(key as keyof typeof chartConfig)}
              className="text-xs"
            >
              {config.label}
            </Button>
          ))}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={stockData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="businessDate"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="font-bold">
                          {new Date(label).toLocaleDateString()}
                        </div>
                        {payload.map((entry) => (
                          <div key={entry.name} className="flex items-center">
                            <div
                              className="mr-2 h-2 w-2 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="font-medium">{entry.name}: </span>
                            <span className="ml-1">${entry.value}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              {activePrices.map((price) => (
                <Line
                  key={price}
                  type="monotone"
                  dataKey={`${price}Price`}
                  stroke={chartConfig[price].color}
                  name={chartConfig[price].label}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default StockChart;
