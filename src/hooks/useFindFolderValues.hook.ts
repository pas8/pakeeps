import { filter } from "lodash";
import { MouseEventHandler } from "react";
import { useWindowSize } from "react-use";

export const useFindFolderValues = () => {

  // const { width: windowWidth, height: windowHeight } = useWindowSize();


  // const allMarginsOfBottomView = marginsOfToogleGroups * (allFolders.length + 1);
  // const allMarginsOfNotBottomView = marginsOfToogleGroups * (allFolders.length + 4) + spacing(8);

  // const allMarginsOfToogleGroups = positionOfFolderViewWithPakeepViewIsBottom
  //   ? allMarginsOfBottomView
  //   : allMarginsOfNotBottomView;


  // const marginsOfToogleGroups = spacing(marginOfToogleGroups) * 2;


  // const buttonSize = positionOfFolderViewWithPakeepViewIsBottom ? buttonWidth : buttonHeight;
  // const avarageButtonSize = buttonSize / flattenAllFolders.length;

  // const foldersSize = buttonSize + allMarginsOfToogleGroups;
  // const windowSize = positionOfFolderViewWithPakeepViewIsBottom ? windowWidth : windowHeight;

  // const idxOfFolderItemWhichShouldBeInMenu =
  //   flattenAllFolders.length - ~~((foldersSize - windowSize) / avarageButtonSize);
  // const [menuAnchorEl, setMenuAnchorEl] = useState<any>(null);
  // const isMoreMenuopen = Boolean(menuAnchorEl);

  // const handleOpenMenu: MouseEventHandler<HTMLButtonElement> = ({ currentTarget }) => setMenuAnchorEl(currentTarget);
  // const handleCloseMenu = () => setMenuAnchorEl(null);

  // const arrToMapOfMoreMenu = filter(flattenAllFolders, (el, idx) => idxOfFolderItemWhichShouldBeInMenu <= idx);

  // useEffect(() => {
  //   const MARGIN_VALUE = +(
  //     positionOfFolderViewWithPakeepViewIsBottom &&
  //     buttonSize + (marginsOfToogleGroups * allFolders.length) / 2 - windowSize
  //   );

  //   setMargin(MARGIN_VALUE);
  // }, [buttonSize]);

  // useEffect(() => {
  //   setIsSizeOfFoldersMoreThanSize(foldersSize > windowSize);
  // }, [foldersSize, avarageButtonSize, windowSize]);


  
};
