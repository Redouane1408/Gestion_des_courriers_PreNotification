import { TrendingUp } from "lucide-react"
import { PieChart, Pie, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface RadialChartProps {
  data: {
    totalMails: number
    incomingMails: number
    outgoingMails: number
    activeUsers: number
  }
}

const chartConfig = {
  incoming: {
    label: "Courriers entrants",
    color: "hsl(var(--chart-1))",
  },
  outgoing: {
    label: "Courriers sortants", 
    color: "hsl(var(--chart-2))",
  },
  users: {
    label: "Utilisateurs actifs",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function RadialChart({ data }: RadialChartProps) {
  const chartData = [
    {
      name: "Courriers entrants",
      value: data.incomingMails,
      fill: "var(--color-incoming)",
    },
    {
      name: "Courriers sortants",
      value: data.outgoingMails,
      fill: "var(--color-outgoing)",
    },
    {
      name: "Utilisateurs actifs",
      value: data.activeUsers,
      fill: "var(--color-users)",
    },
  ]

  const total = data.totalMails

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Répartition des données</CardTitle>
        <CardDescription>Distribution des courriers et utilisateurs</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="text-3xl font-bold">{total}</div>
          <div className="text-sm text-muted-foreground">Total des courriers</div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Données en temps réel <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Affichage de la répartition actuelle
        </div>
      </CardFooter>
    </Card>
  )
}