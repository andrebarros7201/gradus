import { Button } from '@/components/ui/button/Button';
import { Form } from '@/components/ui/form/Form';
import { GradeValueSelect } from '@/components/ui/gradeValueSelect/GradeValueSelect';
import { Modal } from '@/components/ui/modal/Modal';
import { updateGrade } from '@/redux/slices/currentSubjectSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch } from '@/redux/store';
import { IGradeSimple } from '@/types/IGradeSimple';
import { INotification } from '@/types/INotificationSlice';
import { FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  grade: IGradeSimple;
};

export const UpdateGradeButton = ({ grade }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<RootDispatch>();
  const gradeValueRef = useRef<HTMLSelectElement>(null);

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();

    const gradeValue = gradeValueRef.current?.value;
    try {
      const response = await dispatch(
        updateGrade({ gradeId: grade.id, value: Number(gradeValue) }),
      ).unwrap();
      const { notification } = response;
      dispatch(setNotification(notification));
      setIsModalOpen(() => false);
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }

  return (
    <>
      <Button label={'Update'} variant="secondary" onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <Modal title={'Update Grade'} onClose={() => setIsModalOpen(false)}>
          <Form onSubmit={(e) => handleUpdate(e)}>
            <GradeValueSelect ref={gradeValueRef} />
            <Button label={'Update'} type="submit" />
          </Form>
        </Modal>
      )}
    </>
  );
};
