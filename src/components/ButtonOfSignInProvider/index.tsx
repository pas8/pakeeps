import { makeStyles, Grid } from '@material-ui/core';
import BackgroundPlaceholderByPas from 'components/BackgroundPlaceholder';
import { useAlpha } from 'hooks/useAlpha.hook';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { useThemeColors } from 'hooks/useThemeColors.hook';
import { FC } from 'react';
import { useHover } from 'react-use';
import { ButtonOfSignInProviderPropsType, UseStylesOfButtonOfSignInProviderType } from './types';

const useStyles = makeStyles(({ spacing, shape: { borderRadius }, typography: { h6 } }) => ({
  container: ({ color }: UseStylesOfButtonOfSignInProviderType) => ({
    position: 'relative',
    marginBottom: spacing(1.4),
    width: '100%',
    height: spacing(8),
    borderRadius,
    cursor:'pointer',
    border: '2px solid',
    borderColor: useAlpha(color, 0.42),
    background: useAlpha(color, 0.42),

    '&:hover': {
      background: useAlpha(color, 0.8),

      borderColor: useAlpha(color, 0.8)
    },
    '& button': {
      color,
      borderColor: useAlpha(color, 0.42),
      '&:hover': {
        borderColor: color
      }
    }
  })
}));

const ButtonOfSignInProvider: FC<ButtonOfSignInProviderPropsType> = ({ onClick, color, name }) => {
  const [icon] = useTakeIcon(name);

  const [, , textColor] = useThemeColors();
  const classes = useStyles({ color });
  // console.log(icon);

  const [buttonOfSignInProvider] = useHover(isHovering => (
    <Grid className={classes.container} onClick={onClick}>
      <BackgroundPlaceholderByPas
        color={isHovering ? useAlpha(color, 0.8) : useAlpha(textColor, 1)}
        title={name}
        size={1000}
        isButtonIconIsComponent
        ButtonIcon={icon}
        buttonText={`Sign In with ${name}`}
        onClick={onClick}
        isButtonBig
      />
    </Grid>
  ));

  return buttonOfSignInProvider;
};

export default ButtonOfSignInProvider;
