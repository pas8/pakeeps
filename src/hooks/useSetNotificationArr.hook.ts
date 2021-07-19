import { errorMessages } from 'models/denotation';
import { SnackbarSeverityNames } from 'models/unums';
import { useSnackbar } from 'notistack';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toChangeTemporaryData } from 'store/modules/App/actions';
import { getUserData } from 'store/modules/App/selectors';

export const useSetNotificationArr = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { isEmailVerified, email } = useSelector(getUserData);

  useEffect(() => {
    console.log(isEmailVerified)
    const notifinationArr = [
      {
        text: 'Please verificate email',
        customIconComponent: false,
        onClick: (e: any) => {
          firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(result => {
              enqueueSnackbar({
                message: 'Email verification link was sended again',
                severity: SnackbarSeverityNames.INFO
              });
            })
            .catch(error => {
              enqueueSnackbar({
                message: error.message || errorMessages.SOMETHING_WENT_WRONG,
                severity: SnackbarSeverityNames.ERROR
              });
            });
        },
        iconName: 'email',
        id: 'PLEASE_VERIFICATE_EMAIL'
      }
    ];

    dispatch(toChangeTemporaryData({ newTemporaryData: { notifinationArr } }));
  }, [isEmailVerified,email]);
};
