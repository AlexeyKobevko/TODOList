import './PaginationPanel.scss';

import React from 'react';

export const PaginationPanel = ({count, page, callback}) => {

  const generateList = () => {
    const list = [];
    for (let i = 1; i <= count/3; i++) {
      list.push(
        <div onClick={callback}
             className={i === page ? "pag-list-item active-pag-item" : "pag-list-item"}
             key={i}>{i}</div>
      );
    }
    return list;
  };

  return (
    <div className="pag-panel-wrapper">
      {generateList(count)}
    </div>
  );
};