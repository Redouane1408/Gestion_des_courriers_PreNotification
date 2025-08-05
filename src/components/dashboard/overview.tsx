import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts"
import { TrendingUp, Calendar } from "lucide-react"

interface OverviewData {
  name: string;
  total: number;
  incoming?: number;
  outgoing?: number;
  archived?: number;
}

export function Overview({ data }: { data: OverviewData[] }) {
  // Color palette for different data points
  const colors = [
    "#3b82f6", // blue
    "#3b82f6", // emerald
    "#3b82f6", // amber
    "#3b82f6", // red
    "#3b82f6", // violet
    "#3b82f6", // cyan
    "#3b82f6", // lime
    "#3b82f6", // orange
    "#3b82f6", // pink
    "#3b82f6", // indigo
    "#3b82f6", // teal
    "#3b82f6"  // yellow
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <p className="font-semibold text-gray-900 dark:text-gray-100">{label}</p>
          </div>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {entry.dataKey === 'total' ? 'Total des courriers' : entry.dataKey}
                </span>
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {entry.value}
              </span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <TrendingUp className="h-3 w-3" />
              <span>Cliquez pour plus de détails</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom label formatter
  const formatXAxisLabel = (value: string) => {
    // Truncate long month names for better display
    if (value.length > 8) {
      return value.substring(0, 8) + '...';
    }
    return value;
  };

  return (
    <div className="w-full">
      {/* Header with statistics */}

      {/* Enhanced Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Évolution des courriers par période
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Visualisation détaillée du nombre de courriers traités
          </p>
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            barCategoryGap="20%"
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb" 
              className="dark:stroke-gray-600"
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tickFormatter={formatXAxisLabel}
              className="dark:stroke-gray-400"
            />
            <YAxis 
              stroke="#6b7280" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${value}`}
              className="dark:stroke-gray-400"
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />
            {/* <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="rect"
            /> */}
            <Bar 
              dataKey="total" 
              name="Total des courriers"
              radius={[6, 6, 0, 0]} 
              className="transition-all duration-300 hover:opacity-80"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]}
                  className="hover:brightness-110 transition-all duration-200"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Chart Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</span>
            <span>Données en temps réel</span>
          </div>
        </div>
      </div>
    </div>
  )
}
