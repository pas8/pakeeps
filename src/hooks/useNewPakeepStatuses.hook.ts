import { useState } from 'react';

export const useNewPakeepStatuses = () => {
  const defaultStatusState: { [key: string]: boolean } = {
    isTextHidden: true,
    isLabelViewHidden: false,
    isNewPakeepContainerHaveFullWidth: true,
    isAccomplishedCheckBoxesHidden: false
  };

  const [statusState, setStatusState] = useState(defaultStatusState);
const toNulittyStatusState = () => setStatusState(defaultStatusState)

  const handleAccomplishedCheckBoxesHiddenStatus = () => {
    setStatusState(state => ({
      ...state,
      isAccomplishedCheckBoxesHidden: !state.isAccomplishedCheckBoxesHidden
    }));
  };
  const handleStatusOfHideLabelView = () => {
    setStatusState(state => ({ ...state, isLabelViewHidden: !state.isLabelViewHidden }));
  };
  const handleSetWidth = () => {
    setStatusState(state => ({
      ...state,
      isNewPakeepContainerHaveFullWidth: !state.isNewPakeepContainerHaveFullWidth
    }));
  };

  const hanldeChangeTextVisiblittyStatus = () =>
    setStatusState(state => ({ ...state, isTextHidden: !state.isTextHidden }));

  return {
    statusState,
    toNulittyStatusState,
    hanldeChangeTextVisiblittyStatus,
    handleSetWidth,
    handleStatusOfHideLabelView,
    handleAccomplishedCheckBoxesHiddenStatus
  };
};
