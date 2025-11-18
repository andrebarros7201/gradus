import { Button } from '@/components/ui/button/Button';
import { deleteEvaluation } from '@/redux/slices/currentSubjectSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch } from '@/redux/store';
import { INotification } from '@/types/INotificationSlice';
import { useDispatch } from 'react-redux';

type Props = {
  evaluationId: number;
};

export const DeleteEvaluationButton = ({ evaluationId }: Props) => {
  const dispatch = useDispatch<RootDispatch>();
  async function handleDelete() {
    try {
      const response = await dispatch(deleteEvaluation({ evaluationId })).unwrap();
      dispatch(setNotification(response.notification));
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }
  return <Button label={'Delete'} variant="danger" onClick={handleDelete} />;
};
