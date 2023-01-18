import { TableCell, TableRow } from "@mui/material";
import { FC } from "react";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import {
  ProductType,
  selectProduct,
} from "../../redux/slices/products/productsSlice";

interface Props {
  i: number;
  product: ProductType;
}

const ProductTableRow: FC<Props> = ({ i, product }) => {
  const dispatch = useAppDispatch();

  return (
    <TableRow
      key={product.name}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        backgroundColor: product.color,
      }}
      onClick={() => {
        dispatch(selectProduct(i));
      }}
    >
      <TableCell component="th" scope="row">
        {product.id}
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell align="right">{product.year}</TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
