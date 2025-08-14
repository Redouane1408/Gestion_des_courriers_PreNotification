import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

interface RadialSingleChartProps {
  title: string
  value: number
  maxValue?: number
  color: string
  icon: React.ReactNode
  showPercentage?: boolean
}

export function RadialSingleChart({ 
  title, 
  value, 
  maxValue, 
  color, 
  icon, 
  showPercentage = true 
}: RadialSingleChartProps) {
  // If no maxValue provided, create a visual representation based on value
  const calculatedMax = maxValue || Math.max(value * 1.5, 10)
  const percentage = calculatedMax > 0 ? Math.min((value / calculatedMax) * 100, 100) : 0
  
  const chartData = [
    {
      name: "value",
      value: percentage,
      fill: color,
    },
    {
      name: "remaining",
      value: 100 - percentage,
      fill: "hsl(var(--muted))",
    },
  ]

  const chartConfig = {
    value: {
      label: title,
      color: color,
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <ChartContainer
              config={chartConfig}
              className="h-16 w-16"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={32}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              {showPercentage ? (
                <span className="text-xs font-bold">{Math.round(percentage)}%</span>
              ) : (
                <span className="text-xs font-bold">{value}</span>
              )}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">{value}</div>
            {maxValue && (
              <p className="text-xs text-muted-foreground">
                sur {maxValue}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}