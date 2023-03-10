import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TableContainer from "@mui/material/TableContainer";
import { FC } from "react";
import { ProductType } from "../redux/slices/products/productsSlice";

interface Props {
  open: boolean;
  onClose: () => void;
  product?: ProductType;
}

const ProductDialog: FC<Props> = ({ onClose, open, product }) => {
  const { id, color, name, pantone_value, year } = product!;

  const rows = [
    { title: "ID", value: id },
    { title: "Name", value: name },
    { title: "Color", value: color },
    { title: "Pantone value", value: pantone_value },
    { title: "Year", value: year },
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Product Summary</DialogTitle>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="Product summary table">
          <TableBody>
            {rows.map(({ title, value }, i) => (
              <TableRow key={i}>
                <TableCell>{title}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  );
};

export default ProductDialog;
