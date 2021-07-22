import { Grid, Typography, makeStyles } from '@material-ui/core';
import { useTakeIcon } from 'hooks/useTakeIcon.hook';
import { FC } from 'react';
import { ListPlaceholdersOfFolderPropertyiesPropsType } from './types';

const useStyles = makeStyles(({ spacing, typography: { h1, h2, h3 }, palette, breakpoints }) => ({
  container: ({ color }: { color?: string }) => ({
    height: '80vh',
    '& svg,p': {
      color: !!color ? color : palette.text.hint
    },
    '& svg': {
      fontSize: '20em',

      [breakpoints.down('md')]: {
        fontSize: '14em'
      },

      [breakpoints.down('sm')]: {
        fontSize: '12em'
      },
      [breakpoints.down('xs')]: {
        fontSize: '20em'
      }
    },
    '& p': {
      ...h2,
      maxWidth: '600px',
      [breakpoints.down('md')]: {
        maxWidth: '500px'
      },
      [breakpoints.down('sm')]: {
        maxWidth: '400px',
        ...h3
      },

      [breakpoints.down('xs')]: {
        ...h1,
        maxWidth: '96%',

        textAlign: 'center'
      }
    }
  })
}));

const ListPlaceholdersOfFolderPropertyies: FC<ListPlaceholdersOfFolderPropertyiesPropsType> = ({
  iconName,
  title,
  color
}) => {
  const { container } = useStyles({ color });

  const [icon] = useTakeIcon(iconName);

  return (
    <Grid container alignItems={'center'} justify={'center'} className={container}>
      <Grid container alignItems={'center'} justify={'center'}>
        {icon}
        <Typography> {title} </Typography>
      </Grid>
    </Grid>
  );
};

export default ListPlaceholdersOfFolderPropertyies;
