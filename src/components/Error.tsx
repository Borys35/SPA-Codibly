import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  error: unknown;
  onRefetchClick: () => void;
}

const Error: FC<Props> = ({ error, onRefetchClick }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="body1" color="red">
        Unexpected error occured. Try again later.
      </Typography>
      <Button onClick={onRefetchClick} variant="contained" color="error">
        Reload
      </Button>
      <Typography variant="body1">Error JSON string:</Typography>
      <Typography variant="body1">{JSON.stringify(error)}</Typography>
    </Box>
  );
};

export default Error;
