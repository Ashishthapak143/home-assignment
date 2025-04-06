import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ICategory } from '../../type/filter';

type PieChartCompProps = {
  categoryData: ICategory[]
}

const PieChartComp: React.FC<PieChartCompProps> = ({ categoryData }) => {
  const [categories, setCategories] = useState<{ name: string; y: number }[]>([]);

  const getCharData = () => {
    const chartData = categoryData.map((category: ICategory) => ({
      name: category.name,
      y: Math.floor(Math.random() * 100) + 1,
    }));
    setCategories(chartData);
  };

  useEffect(() => {
    getCharData();
  }, [categoryData]);

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Categories',
    },
    tooltip: {
      pointFormat: '<b>{point.name}</b>: {point.y} items',
    },
    series: [
      {
        name: 'Categories',
        type: 'pie',
        data: categories,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChartComp;
