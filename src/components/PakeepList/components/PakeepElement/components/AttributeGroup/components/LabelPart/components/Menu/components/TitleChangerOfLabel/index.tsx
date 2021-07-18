import { TextField, makeStyles, Grid, withStyles } from '@material-ui/core';
import { useAlpha } from 'hooks/useAlpha.hook';
import { FC } from 'react';
import { TitleChangerOfLabelPropsType, UseStylesOfTitleChangerOfLabelType } from './type';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(1.4, 0.8, 0.8, 0.8)
  }
}));

const InputWithCustomColor = withStyles({
  root: ({ customColor }: UseStylesOfTitleChangerOfLabelType) => ({
    // '& label.Mui-focused': {
    //   color: customColor
    // },

    '& .MuiOutlinedInput-root': {
      color: customColor?.bgHover,

      '& fieldset': {
        borderColor: customColor?.bgHover
      },
      '&:hover fieldset': {
        borderColor: customColor?.bgHover,

        boxShadow: `0px 0px 4px 1px ${useAlpha(customColor?.bgHover, 0.42)}`
      },
      '&.Mui-focused fieldset': {
        borderColor: customColor?.bgUnHover,
        boxShadow: `0px 0px 4px 1px ${customColor?.bgUnHover}`
      },
      '&.Mui-focused ': {
        color: customColor?.bgUnHover
      }
    }
  })
})(TextField);

const TitleChangerOfLabel: FC<TitleChangerOfLabelPropsType> = ({ value, onChange, customColor, ...textFieldProps }) => {
  const classes = useStyles();

  const defaultTextFieldProps = {
    autoFocus: true,
    variant: 'outlined' as 'outlined',
    fullWidth: true,
    color: 'secondary' as const,
    value,
    placeholder: 'Title',
    onChange,
    ...textFieldProps
  };
  const inputWithCustomColorProps = { ...defaultTextFieldProps, customColor };

  const InputTitleChangerOfLabel = !customColor?.isUseDefault ? InputWithCustomColor : TextField;
  const allTextFieldProps = !customColor?.isUseDefault ? inputWithCustomColorProps : defaultTextFieldProps;

  return (
    <Grid className={classes.container}>
      {
        //@ts-ignore
        <InputTitleChangerOfLabel {...allTextFieldProps} />
      }
    </Grid>
  );
};

export default TitleChangerOfLabel;
