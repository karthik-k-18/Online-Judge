import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ id,type, message }) {
  const [open, setOpen] = React.useState(true);
  console.log(id);
  React.useEffect(() => {
    setOpen(true);
  }, [id]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {type === "success" ? (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert severity="success">{message}</Alert>
        </Snackbar>
      ) : (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert severity="error">{message}</Alert>
        </Snackbar>
      )}
    </>
  );
}