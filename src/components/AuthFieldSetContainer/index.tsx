import { Children, FC } from 'react';
import FieldSetContainer from 'components/FieldSetContainer';
import { FieldSetContainerPropsType } from 'models/types';

const AuthFieldSetContainer: FC<FieldSetContainerPropsType> = ({ children, ...props }) => {
  return (
    <FieldSetContainer lg={4} xl={3} md={5} sm={8} xs={12} container item {...props}>
      {children}
    </FieldSetContainer>
  );
};

export default AuthFieldSetContainer;
