import { makeStyles, Typography } from '@material-ui/core';
import { FC } from 'react';

const useStyles = makeStyles(
  ({ palette, spacing, shape: { borderRadius }, typography: { subtitle1, subtitle2, h6 } }) => ({
    caption: {
      padding: spacing(0, 0, 1, 0),
      ...subtitle1,
      fontWeight: h6.fontWeight,
      fontSize: '1.08em'
    }
  })
);
const CaptionOfSettingGroup: FC<{ title: string }> = ({ title }) => {
  const { caption } = useStyles();

  return (
    <Typography className={caption} color={'textSecondary'}>
      {title}{' '}
    </Typography>
  );
};

export default CaptionOfSettingGroup;
