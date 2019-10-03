import './SortPanel.scss';

import React, { useState } from 'react';

export const SortPanel = props => {
  const [ activeName, setActiveName] = useState(props.sortField === 'username');
  const [ activeEmail, setActiveEmail] = useState(props.sortField === 'email');
  const [ activeStatus, setActiveStatus] = useState(props.sortField === 'status');
  const [ direction, setNewDirection ] = useState(props.sortDirection === 'asc');

  const down = <svg width="0.5em" height="0.5em" viewBox="0 0 2 2" preserveAspectRatio="none">
    <polygon fill="white" points="0,0 2,0 1,2"/>
  </svg>;
  const up = <svg width="0.5em" height="0.5em" viewBox="0 0 2 2" preserveAspectRatio="none">
    <polygon fill="white" points="1,0 2,2 0,2"/>
  </svg>;

  const setActiveField = (e) => {
    props.handleSortField(e.target.getAttribute('data-name'));
    switch (e.target.getAttribute('data-name')) {
      case 'username':
        setActiveName(true);
        setActiveEmail(false);
        setActiveStatus(false);
        break;
      case 'email':
        setActiveName(false);
        setActiveEmail(true);
        setActiveStatus(false);
        break;
      case 'status':
        setActiveName(false);
        setActiveEmail(false);
        setActiveStatus(true);
        break;
      default:
        setActiveName(true);
        setActiveEmail(false);
        setActiveStatus(false);
        break;
    }
  };

  const setDirection = () => {
    props.handleSortDirection(!direction);
    setNewDirection(!direction);
  };

  return (
      <div className="sort-panel-wrapper">
        <div className="sort-panel__item">
          <div onClick={(e) => setActiveField(e)}
               className={!activeName ? 'sort-field' : 'sort-field active-field'}
               data-name="username"
          >
            Sort by name
          </div>
          <div onClick={() => setDirection()}
            className="sort-direction"
          >
            {direction ? down : up}
          </div>
        </div>
        <div className="sort-panel__item">
          <div onClick={(e) => setActiveField(e)}
               className={!activeEmail ? 'sort-field' : 'sort-field active-field'}
               data-name="email"
          >
            Sort by email
          </div>
          <div onClick={() => setDirection()}
               className="sort-direction"
          >
            {direction ? down : up}
          </div>
        </div>
        <div className="sort-panel__item">
          <div onClick={(e) => setActiveField(e)}
               className={!activeStatus ? 'sort-field' : 'sort-field active-field'}
               data-name="status"
          >
            Sort by status
          </div>
          <div onClick={() => setDirection()}
               className="sort-direction"
          >
            {direction ? down : up}
          </div>
        </div>
      </div>
  );
};