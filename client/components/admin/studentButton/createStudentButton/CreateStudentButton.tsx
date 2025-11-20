import { Button } from '@/components/ui/button/Button';
import { Form } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/input/Input';
import { Modal } from '@/components/ui/modal/Modal';
import { createStudent } from '@/redux/slices/currentClassSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch, RootState } from '@/redux/store';
import { INotification } from '@/types/slices/INotificationSlice';
import { FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as z from 'zod';

export const CreateStudentButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { currentClass } = useSelector((state: RootState) => state.currentClass);
  const dispatch = useDispatch<RootDispatch>();
  const nameRef = useRef<HTMLInputElement>(null);

  const studentSchema = z.object({ name: z.string() });

  async function handleCreate(e: FormEvent) {
    e.preventDefault();

    const name = nameRef.current?.value;

    try {
      const result = await studentSchema.safeParseAsync({ name });

      if (!result.success) {
        const firstError = result.error.issues[0].message;
        dispatch(setNotification({ type: 'error', message: firstError }));
        return;
      }

      const response = await dispatch(
        createStudent({ studentName: result.data.name, classId: currentClass!.id }),
      ).unwrap();
      dispatch(setNotification(response.notification));
      setIsModalOpen(false);
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }

  return (
    <>
      <Button label="Create Student" onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <Modal title="Create Student" onClose={() => setIsModalOpen(false)}>
          <Form onSubmit={(e) => handleCreate(e)}>
            <Input label="Name" minValue={0} maxValue={100} type="text" ref={nameRef} />
            <Button label="Create " type="submit" />
          </Form>
        </Modal>
      )}
    </>
  );
};
