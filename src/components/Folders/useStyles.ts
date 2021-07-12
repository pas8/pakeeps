import { makeStyles } from '@material-ui/core';
import { useAlpha } from 'hooks/useAlpha.hook';
import { UseStylesOfFoldersType } from './types';

const marginOfToogleGroups = 1;

export const useStylesOfFolders = makeStyles(
  ({ spacing, typography, palette: { primary, secondary, background, mediumEmphasis, text } }) => ({
    containerOfFolderWithPakeepsView: ({
      isMenuOpen,
      positionOfFolderViewWithPakeepViewIsBottom,
      isFolderViewWithPakeepViewAlignToCenter,
      folderColor,
      isFoldersHaveDraweView,
      headerHeight,
      positionOfFolderViewWithPakeepViewIsRight
    }: UseStylesOfFoldersType) => {
      const color = folderColor;
      return {
        // transform:'scale(0.8)',

        marginTop: isFoldersHaveDraweView
          ? 0
          : positionOfFolderViewWithPakeepViewIsBottom
          ? headerHeight
          : headerHeight,
        // margin: spacing(positionOfFolderViewWithPakeepViewIsBottom ? -10 : -10 + 1.4, 0, 0, 0),
        '& .MuiToggleButtonGroup-root': {
          width: positionOfFolderViewWithPakeepViewIsBottom ? 'auto' : '100%',
          margin: spacing(
            isFoldersHaveDraweView ? 0 : marginOfToogleGroups,
            positionOfFolderViewWithPakeepViewIsRight || positionOfFolderViewWithPakeepViewIsBottom
              ? marginOfToogleGroups
              : 0,
            isFoldersHaveDraweView ? 0 : marginOfToogleGroups,
            isFoldersHaveDraweView
              ? 0
              : positionOfFolderViewWithPakeepViewIsBottom
              ? 1.4
              : !positionOfFolderViewWithPakeepViewIsBottom && !positionOfFolderViewWithPakeepViewIsRight
              ? 1.4
              : 0
          ),
          '&:first-child': {
            marginTop: 0
          },
          background: isFoldersHaveDraweView ? background.paper : background.default
        },
        '& button': {
          flexWrap: 'nowrap',
          height: '100%',
          borderRadius: isFoldersHaveDraweView ? 0 : '',
          padding: spacing(1.4, isFoldersHaveDraweView ? 1.42 : positionOfFolderViewWithPakeepViewIsBottom ? 1.4 : 1),
          // background: isFoldersHaveDraweView ? `${background.paper}` : '',
          border: isFoldersHaveDraweView ? 'none' : `1px solid ${useAlpha(text.primary)}`,
          color: isFoldersHaveDraweView ? text.hint : text.hint,
          display: positionOfFolderViewWithPakeepViewIsBottom && isMenuOpen ? 'block' : 'flex',
          whiteSpace: 'pre',
          justifyContent: !isMenuOpen ? 'center' : 'flex-start',
          flexDirection: 'column',
          '&:hover': {
            background: useAlpha(text.primary)
          },

          '&:last-child': {
            // background:'red',
            borderBottom: isFoldersHaveDraweView ? `1px solid ${mediumEmphasis?.main}` : ''

            // background: isFoldersHaveDraweView ? `${useAlpha(color)} !important` : ''
          },
          '& svg': {
            fontSize: '2em'
          }
        },
        '& .Mui-selected': {
          background: useAlpha(color),
          color,
          borderColor: useAlpha(color),
          '&:hover': { background: useAlpha(color, 0.2) },

          '& svg': { color }
        },
        '& .folderIsPlaceholder': {
          textTransform: 'capitalize',
          '&:hover': {
            background: 'transparent !important'
          }
        }
      };
    },
    textOfFolderWithPakeepsView: ({ positionOfFolderViewWithPakeepViewIsBottom }: UseStylesOfFoldersType) =>
      !positionOfFolderViewWithPakeepViewIsBottom
        ? { padding: spacing(0, 0, 0, 0.8) }
        : {
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            flexWrap: positionOfFolderViewWithPakeepViewIsBottom ? 'wrap' : 'nowrap',
            justifyContent: 'flex-end',
            // width:'100%',
            // height:'100%',
            alignItems: 'center'
          },
    container: {
      margin: spacing(10.32, 0, 0, 0),
      height: '100vh',
      // position: 'fixed',
      '& button:first-of-type': {
        borderTopRightRadius: 4
      },
      '& button:last-of-type': {
        borderBottomRightRadius: 4
      },
      '& .MuiTabs-indicator': {
        // height:'80%',
        width: 2,
        borderRadius: spacing(0.8)
      },

      '& button': {
        textTransform: 'none',
        color: '#fff',
        minWidth: '40px',
        fontWeight: typography.fontWeightRegular,
        fontSize: typography.pxToRem(16),
        // borderRadius:8,
        '&:focus': {
          opacity: 1
        },
        minHeight: 0,
        // marginTop: spacing(1.4),
        // margin:spacing(2,0),
        marginBottom: spacing(0.8),
        padding: spacing(1.48, 2.6),
        '& span': {
          flexDirection: 'row',
          '& svg': {
            fontSize: '1.8em'
            // margin: spacing(0.8, 0.4, 0, 0)
          }
        }
      }
    }
  })
);
