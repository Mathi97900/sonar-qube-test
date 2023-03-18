import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSnackbar } from '../store/action/snackbarAction';
import { RootState } from '../store/reducer';

// function AlertBar(props:any) {
//   debugger;
//   // eslint-disable-next-line react/jsx-props-no-spreading
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
const Alert = React.forwardRef((props:any, ref:any) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);
export default function SnackBar() {
  const dispatch = useDispatch();

  const {
    successSnackbarMessage,
    snackbarOpen,
    failureSnackbarMessage,
    severity
  } = useSelector((state:RootState) => state.snackbar);

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Alert onClose={() => handleClose()} severity={severity}>
          {severity === 'success'
            ? successSnackbarMessage
            : failureSnackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
