import { Dialog } from '@material-ui/core';
import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';

const useStyles = makeStyles(theme => ({}));

const DialogOfEditingDate = ({ open, onClose, id, title = '' }) => {
  const classes = useStyles();

  const [eventState, setEventState] = useState({
    title,
    iconName: '',
    color: '',
    id
  });

  // const menuLabelListArr = [
  //   {
  //     title: 'Change title',
  //     dynamicComponent: {
  //       // component: ,
  //       props: { onChange: handleChangeLabelTitle, value: menuState.title, color }
  //     }
  //   },
  //   {
  //     title: 'Change color',
  //     icon: PaletteOutlinedIcon,
  //     name: 'changeLabelColor',
  //     dynamicComponent: {
  //       component: ColorPickerByPas,
  //       props: { handleSave }
  //     }
  //   },
  //   {
  //     title: 'Change view',
  //     icon: ViewOfOutlineLabelIcon,
  //     name: 'changeLabelView',
  //     onClick: handleChangeLabelVariant
  //   },
  //   {
  //     title: menuState.labelIconName ? 'Change icon' : 'Add icon',
  //     icon: CategoryOutlinedIcon,
  //     dynamicComponent: {
  //       component: PreparedColorExamples,
  //       className: null,
  //       props: {
  //         isColor: false,
  //         customColumnElementProps: {
  //           handleChangeLabelIconName,
  //           labelIconName: menuState.labelIconName,
  //           color,
  //           customColor
  //         },
  //         CustomColumnElement: PreparedIconSelectingList,
  //         columnArr: iconsArr
  //       }
  //     },
  //     name: 'changeLabelIcon'
  //   },
  //   {
  //     title: 'Delete label',
  //     icon: DeleteOutlinedIcon,
  //     name: 'deletelabel',
  //     onClick: handleDeleteLabel
  //   }
  // ];

  return <Dialog open={open} onClose={onClose}></Dialog>;
};

DialogOfEditingDate.propTypes = {};

export default DialogOfEditingDate;
