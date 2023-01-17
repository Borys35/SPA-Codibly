import { Box, Button, TextField } from "@mui/material";
import { FC, useState } from "react";

interface Props {
  onSubmit: (id: number) => void;
}

const FilterForm: FC<Props> = ({ onSubmit }) => {
  const [id, setId] = useState<number>(0);

  function handleClick() {
    if (id === undefined) return;

    onSubmit(id);
  }
  return (
    <Box display="flex">
      <TextField
        type="number"
        size="small"
        onChange={(e) => setId(parseInt(e.target.value))}
        value={id}
      />
      <Button variant="contained" onClick={handleClick}>
        Find
      </Button>
    </Box>
  );
};

export default FilterForm;
