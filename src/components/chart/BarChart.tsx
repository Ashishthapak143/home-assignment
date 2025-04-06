import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { IProduct } from '../../type/filter';

type BarChartCompProps = {
  data: IProduct[]
}

const BarChartComp: React.FC<BarChartCompProps> = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Product Prices',
    },
    xAxis: {
      categories: data.map((item) => item.title),
      title: {
        text: 'Products',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Price ($)',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
      },
    },
    tooltip: {
      valuePrefix: '$',
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          inside: false,
          format: '${y}',
          style: {
            fontWeight: 'bold',
            color: '#333',
          },
        },
      },
    },
    series: [
      {
        name: 'Price',
        data: data.map((item) => item.price),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default BarChartComp;
