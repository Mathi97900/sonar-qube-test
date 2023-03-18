import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function SwanROI() {
  const options = {
    plugins: {
      title: {
        display: false,
        text: 'Swan ROI'
      },
      legend: {
        display: false,
        position: 'bottom' as const,
        labels: {
          usePointStyle: true
        }
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          // callback:function(value: any,index: any,){
          //   console.log(this.getLabelForValue(value))
          // }
          callback(val: any): string {
            return `${val}%`;
          }
        }
      }
    }
  };

  const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'A', 'N', 'D'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Swan users',
        data: [15, 15, 15, 15, 15, 15, 15],
        backgroundColor: '#8062F8'
      },
      {
        label: 'Non-Swan users',
        data: [30, 35, 40, 45, 25, 35, 25],
        backgroundColor: '#271669'
      }
    ]
  };
  return <Bar width="599" height="279" options={options} data={data} />;
}
