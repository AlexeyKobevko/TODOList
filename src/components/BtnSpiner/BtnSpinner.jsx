import './BtnSpinner.scss';

import React from 'react';

export const BtnSpinner = () => {
  return (
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
  );
};