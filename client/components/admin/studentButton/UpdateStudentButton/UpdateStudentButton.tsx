import { Button } from '@/components/ui/button/Button';
import { Form } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/input/Input';
import { Modal } from '@/components/ui/modal/Modal';
import { updateStudent } from '@/redux/slices/currentClassSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch } from '@/redux/store';
import { INotification } from '@/types/slices/INotificationSlice';
import { IStudentSimple } from '@/types/interfaces/IStudentSimple';
import { FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as z from 'zod';

type Props = {
  item: IStudentSimple;
};
export const UpdateStudentButton = ({ item }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<RootDispatch>();
  const nameRef = useRef<HTMLInputElement>(null);

  const studentSchema = z.object({
    name: z.string().nonempty('Name is required').min(3, 'Name must have at least 3 characters'),
  });

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();

    const name = nameRef.current?.value;

    const result = studentSchema.safeParse({ name });

    if (!result.success) {
      const firstError = result.error.issues[0].message;
      dispatch(setNotification({ type: 'error', message: firstError }));
      return;
    }

    try {
      const response = await dispatch(
        updateStudent({ studentId: item.id, studentName: result.data.name }),
      ).unwrap();

      const { notification } = response;
      dispatch(setNotification(notification));
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }

  return (
    <>
      <Button label={'Update'} variant="secondary" onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title={'Update Student'}>
          <Form onSubmit={(e: FormEvent) => handleUpdate(e)}>
            <Input
              label={'Name'}
              type={'text'}
              defaultValue={item.name}
              minValue={3}
              maxValue={100}
              ref={nameRef}
            />
            <Button label={'Update'} type="submit" />
          </Form>
        </Modal>
      )}
    </>
  );
};
