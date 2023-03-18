import {
  ArcElement, Chart as ChartJS, Legend, Tooltip
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface salesProps {
  title: string;
}
export default function SalesByFitType({ title }: salesProps) {
  const pieDataset = {
    fitType: {
      name: ['Best Match', 'Oversized', 'Tight Fit'],
      value: [52, 32, 24]
    },
    orderType: { name: ['(1,325)', '(172)'], value: [83, 17] }
  };
  const data = {
    labels:
      title === 'Sales by Fit Type'
        ? pieDataset.fitType.name
        : pieDataset.orderType.name,
    datasets: [
      {
        label: title,
        data:
          title === 'Sales by Fit Type'
            ? pieDataset.fitType.value
            : pieDataset.orderType.value,
        backgroundColor:
          title === 'Sales by Fit Type'
            ? ['#5932F3', '#C0B4F2', '#7958FE']
            : ['#5932F3', '#7958FE'],
        borderColor:
          title === 'Sales by Fit Type'
            ? ['#5932F3', '#C0B4F2', '#7958FE']
            : ['#5932F3', '#7958FE'],
        borderWidth: 1
      }
    ],
    datalabel: {
      font: {
        weight: 'bold'
      }
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
      datalabels: {
        // formatter: (value: any) => {

        formatter: (value: any, context: any) => {
          const datalabelFormatter = [`${value}%`];
          if (context.dataset.label === 'Order Types') {
            datalabelFormatter.push(
              context.chart.data.labels[context.dataIndex]
            );
          }
          return datalabelFormatter;
        },
        color: 'white',
        font: {
          family: 'AvenirLTPro-Heavy',
          size: 18,
          weight: 800
        }
      },
      title: {
        display: false,
        text: title
      },
      width: 200,
      height: 200
    }
  };
  //   const options = {
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         display: false,
  //       },
  //       datalabels:{
  // formatter:(value: any,context: any)=>{
  //   console.log(value)
  //   console.log(context)
  //   return value
  // }
  //       },
  //     // labels:{
  //     //   render:(args: { label: any; value: any; })=>{
  //     //     return `${args.label} ${args.value}`
  //     //   },
  //     //   fontColor: ["green", "white", "red"],
  //     // },
  //       title: {
  //         display: true,
  //         text: props.title,
  //       },
  //     },

  //   };

  return (
    <Pie
      // width={"10px"}
      style={{ width: '300px', height: '300px' }}
      data={data}
      options={options}
      plugins={[ChartDataLabels]}
    />
  );
}
