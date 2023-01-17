import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { Box, Icon, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box alignItems="center" flexDirection="column" display="flex">
      <Icon component={HourglassEmptyIcon} />
      <Typography>Loading...</Typography>
    </Box>
  );
};

export default Loading;
