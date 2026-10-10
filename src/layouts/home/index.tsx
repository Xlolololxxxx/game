import { Box, Container, Stack } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import {
  Header,
  HeaderLogoContainer,
  Logo
} from './styles';

const HomeLayout = () => {

  return (
    <Stack display={"flex"} sx={{ width: "100%", height: '100%' }}>
      <Box position={"absolute"}
        sx={{
          width: "100%", height: "100%",
          backgroundImage: 'url(/assets/images/landing-page/gambly-bg.png)',
          backgroundSize: 'cover',
          fontFamily: 'Montserrat'
        }} />
      <Stack zIndex={2}
        display={"flex"}
        sx={{ zIndex: 2, width: "100%", height: '100%' }}>
        <Box sx={{ width: "100%", height: "65.5%" }} />
        <Box display={"flex"}
          bgcolor={"white"}
          height={"44.5%"}
          color={"#687D97"}
          fontFamily={"Inter"}
          paddingBottom={"40px"}
          alignItems={"flex-end"}
          justifyContent={"center"}
          fontWeight={"700"}>
          Copyright © AZ Consulting EOOD
        </Box>
      </Stack>
      <Stack zIndex={3}
        position={"absolute"}
        display={"flex"}
        sx={{ zIndex: 2, width: "100%", height: '100%' }}>
        <Header >
          <HeaderLogoContainer>
            <Link to="/">
              <Logo
                alt=""
                src={`/assets/gambly-logo.svg`}
              />
            </Link>
          </HeaderLogoContainer>
        </Header>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Outlet />
        </Container>
      </Stack>
    </Stack>
  )
}

export default HomeLayout