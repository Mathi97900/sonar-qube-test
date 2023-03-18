import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import '../../../styles/pageLoader.css';

export default function Loader() {
  const {
    pageLoader
  } = useSelector((state:RootState) => state.snackbar);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {pageLoader && (
      <div className="pageLoader fadeOut">
        {/* <CircularProgress
          size={20}
          style={{ marginLeft: 6, color: 'white' }}
        /> */}
        <div className="load">
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      </div>
      ) }
    </>
  );
}
