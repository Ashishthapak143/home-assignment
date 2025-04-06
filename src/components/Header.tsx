import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const CustomAppBar = styled(AppBar)`
  background-color: black;
`;

const Title = styled(Typography)`
  flex-grow: 1;
  text-align: center;
  display: block;

  @media (max-width: 600px) {
    display: none;
  }
`;

const HeaderComp = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar position="static">
        <Toolbar>
          <Title variant="h6">
            Products Dashboard
          </Title>
        </Toolbar>
      </CustomAppBar>
    </Box>
  );
};

export default HeaderComp;
