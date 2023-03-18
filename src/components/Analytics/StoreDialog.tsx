import CloseIcon from '@mui/icons-material/Close';
import StoreIcon from '@mui/icons-material/Store';
import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useTheme } from 'emotion-theming';
import { useSelector } from 'react-redux';
import { Text } from 'rebass';
import { RootState } from '../../store/reducer';
import '../../styles/analytics.css';
import { Theme } from '../../theme/px/types';
import FlexBox from '../utility/FlexBox';

interface storeDialogProps {

  storeList: any;
  handleClose: () => void;
  openStoreDialog: boolean;
  handleSelectStore: any;

}
export default function StoreDialog({
  storeList, openStoreDialog, handleClose, handleSelectStore
}: storeDialogProps) {
  const theme = useTheme<Theme>();
  const { currentStore }: any = useSelector((state: RootState) => state.auth);

  // const {
  //   onClose, selectedValue, open, children
  // } = props;

  return (

    <Dialog
      onClose={handleClose}
      open={openStoreDialog}
      style={{

        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      <IconButton
        onClick={handleClose}
        style={{ marginLeft: '93%', height: '28px', padding: '10px' }}
        className="DropcloseIcon"
        disableRipple
      >
        <CloseIcon />
      </IconButton>
      <FlexBox style={{ width: '500px', height: '500px' }} className="storeListDialogContainer">
        {/* <FlexBox vertical alignItems="center" style={{ width: '100%', height: '100%' }}> */}
        {storeList.map((e: any) => (
          <FlexBox
            key={e.store_name}
            mt={theme.marginSpacing.xl}
            vertical
            alignItems="center"
            className={e.store_name === currentStore.store_name ? 'activeStoreListDialog' : 'storeListDialog'}
            onClick={() => handleSelectStore(e)}
          >
            {/* <Box> */}
            {' '}
            <StoreIcon />
            <Text>{e.store_name}</Text>
            {/* </Box> */}
          </FlexBox>
        ))}
        {/* </FlexBox> */}
      </FlexBox>

    </Dialog>
  //   <Dialog
  //     onClose={handleClose}
  //     open={openDropDialog}
  //     className="dropDialog"
  //     px="64px"
  //     style={{
  //       width: '476px',
  //       textAlign: 'center',
  //       overflow: 'hidden'
  //       // height: '547px'
  //     }}
  //   >
  //     <FlexBox vertical alignItems="center">
  //       <IconButton
  //         onClick={handleClose}
  //         style={{ marginLeft: '93%', height: '28px', padding: '10px' }}
  //         className="DropcloseIcon"
  //       >
  //         <CloseIcon />
  //       </IconButton>

  //     <Text
  //       mt={theme.marginSpacing.xxl}
  //       fontFamily={theme.fonts.button}
  //       sx={{ fontWeight: 800, fontSize: '26px' }}
  //     >
  //       Drop in your files
  //     </Text>
  //     <Text mt={theme.marginSpacing.l} width="40%">
  //       XLS, XLSX files allowed
  //     </Text>
  //     <FileUploader name="file">
  //       <FlexBox
  //         className="dropFileCloud"
  //         mt={theme.marginSpacing.xl}
  //         vertical
  //         alignItems="center"
  //         sx={{ cursor: 'pointer' }}
  //         onClick={() => {
  //         //   fileRef.current.click();
  //         }}
  //       >
  //       <input
  //         style={{ display: 'none' }}
  //         type="file"
  //         onChange={(e) => handleUpload(e)}
  //         ref={fileRef}
  //         onClick={(event) => {
  //           console.log(event);
  //           // eslint-disable-next-line no-param-reassign
  //           (event.target as HTMLInputElement).value = '';
  //           // event?.target?.value('');
  //           // event.preventDefault();
  //         }}
  //         multiple
  //       />
  //       <Box mt={theme.marginSpacing.s} />
  //       <Text
  //       // mt={theme.marginSpacing.m}
  //         mb={theme.marginSpacing.xxl}
  //         sx={{
  //           fontSize: '14px',
  //           color: ' #5932F3'
  //         }}
  //       >
  //         Drag and drop your file here
  //       </Text>
  //     </FlexBox >
  //   </FileUploader >
  //   <FlexBox fontFamily={theme.fonts.medium}
  //   mt={theme.marginSpacing.l} sx={{ fontSize: '14px' }}>
  //     <Text padding="5px" sx={{ cursor: 'default' }}>
  //       units are in
  //     </Text>
  //     {' '}
  //       <Text
  //         sx={{
  //           cursor: 'pointer',
  //           padding: '5px',
  //           background: 'rgba(175, 175, 175, 0.14)',
  //           borderRadius: '4px',
  //           color: '#949494'
  //         }}

  //       >
  //         switch to
  //         {' '}

  //       </Text>
  //     </FlexBox>

  //     <FlexBox
  //       mb={theme.marginSpacing.xl}
  //       sx={{
  //         fontWeight: 800,
  //         fontSize: '14px',
  //         fontFamily: theme.fonts.medium,
  //         justifyContent: 'flex-end',
  //         width: '348px'
  //       }}
  //     >
  //       <Button
  //         sx={{
  //           marginLeft: '6px',
  //           width: '85px',
  //           height: '28px',
  //           borderRadius: '4px',
  //           fontFamily: theme.fonts.button,
  //           alignItems: 'center',
  //           display: 'flex',
  //           justifyContent: 'center',
  //           color: 'black',
  //           backgroundColor: 'white'

  //         }}
  //         onClick={handleClose}
  //       >
  //         <Text>Cancel</Text>
  //       </Button>
  //       <Button
  //         sx={{
  //           marginLeft: '6px',
  //           width: '85px',
  //           height: '28px',
  //           background: '#5932F3',
  //           borderRadius: '4px',
  //           fontFamily: theme.fonts.button,
  //           alignItems: 'center',
  //           display: 'flex',
  //           justifyContent: 'center'

  //         }}

  //       >

  //         Save
  //         {' '}

  //       </Button>
  //     </FlexBox>
  //   </FlexBox >
  // </Dialog >
  );
}
