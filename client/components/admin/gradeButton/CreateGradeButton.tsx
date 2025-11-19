import { Button } from '@/components/ui/button/Button';
import { Form } from '@/components/ui/form/Form';
import { GradeValueSelect } from '@/components/ui/gradeValueSelect/GradeValueSelect';
import { Modal } from '@/components/ui/modal/Modal';
import { StudentSelect } from '@/components/ui/studentSelect/StudentSelect';
import { createGrade } from '@/redux/slices/currentSubjectSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch } from '@/redux/store';
import { INotification } from '@/types/INotificationSlice';
import { FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  evaluationId: number;
};

export const CreateGradeButton = ({ evaluationId }: Props) => {
  const dispatch = useDispatch<RootDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const studentRef = useRef<HTMLSelectElement>(null);
  const gradeValueRef = useRef<HTMLSelectElement>(null);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();

    const studentId = studentRef.current?.value;
    const gradeValue = gradeValueRef.current?.value;

    try {
      const response = await dispatch(
        createGrade({ evaluationId, value: Number(gradeValue), studentId: Number(studentId) }),
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
      <Button label={'Add Grade'} onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <Modal title="Create Grade" onClose={() => setIsModalOpen(false)}>
          <Form onSubmit={(e) => handleCreate(e)}>
            <StudentSelect ref={studentRef} />
            <GradeValueSelect ref={gradeValueRef} />
            <Button label={'Create'} type="submit" />
          </Form>
        </Modal>
      )}
    </>
  );
};
