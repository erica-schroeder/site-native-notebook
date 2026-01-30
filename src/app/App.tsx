import { PlantChartMui } from "@/components/PlantChartMui"
import { AppBarNavLayout } from "@erica/mui-web"
import { Box, Paper } from "@mui/material"
import type React from "react"
import { Route, Routes } from "react-router"
import Logo from "@/assets/logo.svg"


export const App: React.FC = () => {
  return (
    <AppBarNavLayout
      containerProps={{ disableGutters: true, maxWidth: false }}
      logo={
        <Box
          component="img"
          src={Logo}
          sx={{ maxHeight: 100 }}
        />
      }
    >
      <Paper elevation={0} >
        <Routes>
          <Route path="/" element={
            <PlantChartMui />
          }
          />
        </Routes>
      </Paper>
    </AppBarNavLayout>
  );
}

export default App;
