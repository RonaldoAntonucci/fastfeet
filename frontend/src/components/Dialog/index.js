import React, { memo } from 'react';

import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { Title } from './styles';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function MyDialog({ open, children, onClose, title }) {
  return (
    <Dialog
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      open={open}
      onClose={onClose}
    >
      <Title style={{ cursor: 'move' }} id="draggable-dialog-title">
        {title}
      </Title>
      {children}
    </Dialog>
  );
}

export default memo(MyDialog);
