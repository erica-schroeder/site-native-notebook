import EmailLink from "@/components/EmailLink";
import { Box, Stack, Typography } from "@mui/material";

export const AboutPage = () => {
  return (
    <Box
      sx={{
        maxWidth: "md",
        margin: "auto",
        padding: { xs: 2, sm: 4 },
      }}
    >
      <Stack spacing={3}>
        {/* Headline */}
        <Typography variant="h4" component="h1">
          About Native Notebook
        </Typography>

        <Typography>
          Hi there! I'm excited to share this project with you.
        </Typography>

        <Typography>
          Native Notebook is my attempt to create a comprehensive and easy-to-use resource for Michigan native plants (with the hope of expanding to other regions in the future). Whether you're planning a garden, a landscape, or just curious about local plants, this site is here to help.
        </Typography>

        <Typography>
          Even as someone who loves native plants, I sometimes get overwhelmed when designing gardens or wandering plant sales — it's hard to know what to buy or where it will fit. Photos usually highlight flowers but rarely show the whole plant at full size.
        </Typography>

        <Typography>
          This chart is designed to give a clear, to-scale view of each plant, so we can better plan gardens and understand how different species relate to each other.
        </Typography>

        <Typography>
          I also want this resource to be a one-stop reference for key plant information: height, spread, bloom color, sun and soil requirements, and more — all in one place. My hope is that it saves us time planning so we can spend more time planting.
        </Typography>

        <Box>
          <Typography fontWeight="bold">A few things to keep in mind:</Typography>
          <ul>
            <li>This is a <strong>work in progress</strong>. Many plants aren't included yet, and some entries may still be incomplete.</li>
            <li>Updates happen regularly as I finish illustrations.</li>
          </ul>
        </Box>

        <Typography>
          If you notice any errors, omissions, or have suggestions, I'd love to hear from you: <EmailLink user="hello" />
        </Typography>

        <Typography>
          Thanks for stopping by, and happy gardening!
        </Typography>

        <Typography>
          - Erica
        </Typography>
      </Stack>
    </Box>
  );

};