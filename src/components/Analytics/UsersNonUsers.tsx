import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// type salesType = {
//   valDiff: number;
//   percentageDiff: number;
//   currVal: number;
//   count:number;
// };
interface lineChartProps {
  title: string;
  // salesData: Array<salesType>;
  salesData: any;
  type: string;
  currencyType: string;
  labelOrder: Array<number>;
}
export default function UsersNonUsers({
  title,
  salesData,
  type,
  currencyType,
  labelOrder
}: lineChartProps) {
  const [nonSwanUser, setNonSwanUser] = useState<number[]>([]);
  const [swanUser, setSwanUser] = useState<number[]>([]);
  const [fitViewData, setFitViewData] = useState([]);
  useEffect(() => {
    if (title === 'Returns') {
      if (salesData?.swanOrders) {
        setSwanUser(salesData?.swanOrders.map((x: { count: any; }) => x.count));
      } else {
        setSwanUser([]);
      }
      if (salesData?.nonSwanOrders) {
        setNonSwanUser(salesData?.nonSwanOrders.map((x: {
          count: any; }) => x.count));
      } else if (salesData?.length > 0) {
        setNonSwanUser(salesData.map((x: { count: any; }) => x.count));
        // setNonSwanUser(salesData.map((x) => x.percentageDiff));
        // setNonSwanUser()
      } else {
        setNonSwanUser([]);
      }
    } else if (title === 'Fit View sessions') {
      if (salesData.length > 0) {
        setFitViewData(salesData.map((x: { count: any; }) => x.count));
      } else {
        setFitViewData([]);
      }
    } else {
    // salesData:Object[]=[]
      if (salesData?.swanOrders) {
        setSwanUser(salesData?.swanOrders.map((x: { percentageDiff: any; }) => x.percentageDiff));
      } else {
        setSwanUser([]);
      }
      if (salesData?.nonSwanOrders) {
        setNonSwanUser(salesData?.nonSwanOrders.map((x: {
        percentageDiff: any; }) => x.percentageDiff));
      } else if (salesData?.length > 0) {
        setNonSwanUser(salesData.map((x: { percentageDiff: any; }) => x.percentageDiff));
      // setNonSwanUser(salesData.map((x) => x.percentageDiff));
      // setNonSwanUser()
      } else {
        setNonSwanUser([]);
      }
    }
  }, [salesData]);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        display: false,
        labels: {
          usePointStyle: true
        }
      },
      title: {
        display: false,
        text: title
      },
      tooltip: {
        callbacks: {
          label(context: any) {
            let label = context.dataset.label || '';
            let valDiff = `Value Difference: 0 ${currencyType}`;
            let currVal = `Current Value: 0 ${currencyType}`;
            let count = 'Number of orders: 0';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y.toFixed(2)}%`;
            }
            const swanOrNonSwan = context.dataset.label === 'Swan users' ? 'swanOrders' : 'nonSwanOrders';
            if (salesData && salesData[swanOrNonSwan]
              && salesData[swanOrNonSwan][context.dataIndex]) {
              valDiff = `Value Difference: ${
                salesData[swanOrNonSwan][context.dataIndex].valDiff
              } ${currencyType}`;
              currVal = `Current Value: ${
                salesData[swanOrNonSwan][context.dataIndex].currVal
              } ${currencyType}`;
              count = `Number of orders: ${salesData[swanOrNonSwan][context.dataIndex].count}`;
            }
            if (title === 'Returns') {
              return [count];
            } if (title === 'Fit View sessions') {
              const openedCount = `Opened count: ${salesData[context.dataIndex].count}`;
              return [openedCount];
            }
            return [label, currVal, valDiff, count];
          }
        }
      }

      // tooltips: {
      //   callbacks: {
      //     afterBody(t:any, d:any) {
      //       console.log(t, d);
      //       return 'loss 15%'; // return a string that you wish to append
      //     }
      //   }
      // }
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          // callback:function(value: any,index: any,){
          //   console.log(this.getLabelForValue(value))
          // }
          callback(val: any): string {
            return ['Fit View sessions', 'Returns'].includes(title) ? val : `${val}%`;
          }
        }
      }
    }
  };
  const monthArray = [
    'J',
    'F',
    'M',
    'A',
    'M',
    'J',
    'J',
    'A',
    'S',
    'O',
    'N',
    'D'
  ];
  const weekArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let labels = monthArray;
  if (type === 'Last month') {
    labels = labelOrder.length > 0
      ? labelOrder.map((x: number) => monthArray[x])
      : monthArray;
  } else if (type === 'Last week') {
    labels = labelOrder.length > 0
      ? labelOrder.map((x: number) => weekArray[x])
      : weekArray;
  } else if (type === 'Last quarter') {
    if (labelOrder.length > 0) {
      labels = [];
    }
    labelOrder.forEach((x: number) => labels.push(monthArray[x]));
    // let currentMonth = new Date().getMonth();
    // currentMonth -= 3;
    // if (currentMonth >= 0) {
    //   labels = monthArray.splice(currentMonth, 3);
    // } else {
    //   currentMonth = 12 + currentMonth;
    //   const temp = monthArray.splice(currentMonth, 3);
    //   if (temp.length !== 3) {
    //     const remainCount = 3 - temp.length;// find the remaining month in quarter
    //     labels = [...temp, ...monthArray.splice(0, remainCount)];
    //   }
    // }
    // labels = ['Jan', 'Feb', 'Mar'];
  }
  let dataSet:any = [];
  if (title === 'Fit View sessions') {
    dataSet = [
      {
        label: 'Swan users',
        data: fitViewData,
        borderColor: '#5932F3',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        // pointStyle: 'rectRot',
        radius: 1
      }
    ];
  } else {
    dataSet = [
      {
        label: 'Swan users',
        data: swanUser || [30, 35, 20, 25, 25, 35, 30, 35, 20, 25, 25, 35],
        borderColor: '#5932F3',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
        // pointStyle: 'rectRot',
        // radius: 1
      },
      {
        label: 'Non-Swan users',
        data: nonSwanUser || [
          25, 12, 32, 25, 30, 35, 15, 25, 12, 32, 25, 30, 35, 15
        ],
        borderColor: '#686868',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
        // pointBackgroundColor(context:any) {
        //   const index = context.dataIndex;
        //   const value = context.dataset.data[index];
        //   // eslint-disable-next-line no-nested-ternary
        //   return value < 0 ? 'red' // draw negative values in red
        //     : index % 2 ? 'blue' // else, alternate values in blue and green
        //       : 'green';
        // }
      }
    ];
  }

  const data = {
    labels,
    datasets: dataSet
  };
  return <Line width="599" height="279" options={options} data={data} />;
}
