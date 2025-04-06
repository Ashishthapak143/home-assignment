import {
  Autocomplete,
  Button,
  FormControl,
  TextField,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { ICategory, IProduct } from "../type/filter";
import { fetchProducts } from "../service/api";

type FilterCompProps = {
  generateReport: (data: IProduct[] | ICategory[], flag: boolean) => void;
  categoryData: ICategory[];
};

const StyledPaper = styled(Paper)`
    width: 300px;
    height: 100%;
    min-height: 450px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    margin: 16px;
  `;

const HeaderBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  `;

const ClearText = styled(Typography)`
    cursor: pointer;
    color: blue;
    font-size: 14px;
  `;

const BottomBox = styled(Box)({
  marginTop: "auto",
});

const StyledButton = styled(Button)({
  backgroundColor: "#1976d2",
  color: "#fff",
  textTransform: "none", // keep button text as-is
});

const FilterComp: React.FC<FilterCompProps> = ({
  generateReport,
  categoryData,
}) => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<null | ICategory>(null);
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);
  const [reportFlag, setReportFlag] = useState(true);

  const getProducts = async (slug: string) => {
    const data = await fetchProducts(slug);
    if (data) setProductData(data);
  };

  const handleReport = () => {
    const data = selectedProducts.length > 0 ? selectedProducts : productData;
    setReportFlag(true);
    generateReport(data, true);
  };

  useEffect(() => {
    if (selectedCategory) {
      getProducts(selectedCategory.slug);
    } else {
      setProductData([]);
      setSelectedProducts([]);
    }
  }, [selectedCategory]);

  return (
    <StyledPaper elevation={2}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <HeaderBox>
          <Typography variant="h6">Filters</Typography>
          <ClearText
            onClick={() => {
              setSelectedCategory(null);
              setSelectedProducts([]);
              setReportFlag(true);
              generateReport(categoryData, false);
            }}
          >
            Clear
          </ClearText>
        </HeaderBox>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Autocomplete
            options={categoryData}
            getOptionLabel={(option) => option.name}
            value={selectedCategory}
            onChange={(_event, newValue) => {
              setSelectedCategory(newValue);
              setReportFlag(newValue ? false : true);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Category" />
            )}
            isOptionEqualToValue={(option, value) => option.slug === value.slug}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 4 }}>
          <Autocomplete
            disabled={!selectedCategory}
            multiple
            options={productData}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            value={selectedProducts}
            onChange={(_event, newValue) => {
              setSelectedProducts(newValue);
              setReportFlag(false);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Product" />
            )}
          />
        </FormControl>
      </Box>

      <BottomBox>
        <StyledButton
          fullWidth
          variant="contained"
          size="medium"
          disabled={reportFlag}
          onClick={handleReport}
        >
          Run Report
        </StyledButton>
      </BottomBox>
    </StyledPaper>
  );
};

export default FilterComp;
