import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ChevronDown, ChevronUp } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const demoWallet = {
  name: "Portfolio Tech Growth",
  categories: [
    { 
      name: "Technologies", 
      percentage: 45, 
      color: "#3B82F6",
      metrics: {
        rendement: "+23.8%",
        volatilite: "22.5%",
        sharpe: "2.1",
        beta: "1.25",
        drawdown: "-15.2%"
      }
    },
    { 
      name: "Santé", 
      percentage: 25, 
      color: "#10B981",
      metrics: {
        rendement: "+15.2%",
        volatilite: "16.8%",
        sharpe: "1.9",
        beta: "0.85",
        drawdown: "-12.1%"
      }
    },
    { 
      name: "Finance", 
      percentage: 15, 
      color: "#6366F1",
      metrics: {
        rendement: "+8.9%",
        volatilite: "19.2%",
        sharpe: "1.4",
        beta: "1.15",
        drawdown: "-18.4%"
      }
    },
    { 
      name: "Consommation", 
      percentage: 10, 
      color: "#F59E0B",
      metrics: {
        rendement: "+11.3%",
        volatilite: "14.5%",
        sharpe: "1.6",
        beta: "0.75",
        drawdown: "-9.8%"
      }
    },
    { 
      name: "Industrie", 
      percentage: 5, 
      color: "#EC4899",
      metrics: {
        rendement: "+7.5%",
        volatilite: "17.8%",
        sharpe: "1.2",
        beta: "0.95",
        drawdown: "-13.7%"
      }
    }
  ]
};

export default function DemoChart() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const data = {
    labels: demoWallet.categories.map(cat => cat.name),
    datasets: [{
      data: demoWallet.categories.map(cat => cat.percentage),
      backgroundColor: demoWallet.categories.map(cat => cat.color),
      borderWidth: 0
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
    cutout: '60%',
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
          {demoWallet.name}
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="aspect-square relative">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-400">Alloué</div>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          {demoWallet.categories.map((category) => (
            <div
              key={category.name}
              className="bg-gray-700/50 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => toggleCategory(category.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-white">{category.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-300">{category.percentage}%</span>
                  {expandedCategories.includes(category.name) ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
              
              {expandedCategories.includes(category.name) && (
                <div className="mt-3 pl-6 text-sm text-gray-400">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Rendement annuel</span>
                      <span className={`${
                        parseFloat(category.metrics.rendement) > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>{category.metrics.rendement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Volatilité</span>
                      <span>{category.metrics.volatilite}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ratio de Sharpe</span>
                      <span>{category.metrics.sharpe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Beta</span>
                      <span>{category.metrics.beta}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Drawdown</span>
                      <span className="text-red-400">{category.metrics.drawdown}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
