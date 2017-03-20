import React from 'react';

import { classes } from '../../../util/constants';

const PlaybackRateBar = ({ onClick, onMouseDown, onTouchStart,
  setBar, children, ...attributes }) => (
    <div
      ref={setBar} className={classes.PLAYBACK_RATE_BAR}
      onClick={onClick} onMouseDown={onMouseDown}
      onTouchStart={onTouchStart} {...attributes}
    >
      {children}
    </div>
);

PlaybackRateBar.defaultProps = {
  onClick: null,
  onMouseDown: null,
  onTouchStart: null,
  setBar: null,
};

PlaybackRateBar.propTypes = {
  onClick: React.PropTypes.func,
  onMouseDown: React.PropTypes.func,
  onTouchStart: React.PropTypes.func,
  setBar: React.PropTypes.func,
  children: React.PropTypes.node.isRequired,
};

export default PlaybackRateBar;