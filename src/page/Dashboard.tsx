import {Box, Grid} from '@mui/material';
import FilterComp from './Filter';
import { useEffect, useState } from 'react';
import BarChartComp from '../components/chart/BarChart';
import PieChartComp from '../components/chart/PieChart';
import { ICategory, IProduct } from '../type/filter';
import { fetchCategories } from '../service/api';
import Loader from '../components/Loader';

const DashboardComp = () => {
  const [categoryData, setCategoryData] = useState<ICategory[]>([]);
  const [reportData, setReportData] = useState<IProduct[] | ICategory[]>([]);
  const [isReport, setIsReport] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const generateReport = (data: IProduct[] | ICategory[], reportFlag: boolean) => {
    if (reportFlag) {
      setLoading(true)
      setTimeout(() => {
        setReportData(data);
        setIsReport(reportFlag);
        setLoading(false);
      }, 3000)
    } else {
      setReportData(data);
      setIsReport(reportFlag);
    }
  }

  const getCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategoryData(data);
    } catch (error) {
      console.log('error');
    }
  };

  useEffect(() => {
    getCategories();
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      {loading && <Loader loading={loading} /> }
      <Grid container spacing={2} sx={{backgroundColor: 'white'}}>
        <Grid size={{xs:6, sm: 6, md: 3, lg: 3}}>
          <FilterComp generateReport={generateReport} categoryData={categoryData} />
        </Grid>
        <Grid size={{xs:6, sm: 6, md: 9, lg: 9}}>
          {isReport ? <BarChartComp data={reportData as IProduct[]} /> : <PieChartComp categoryData={categoryData} />}
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardComp;