import { Button } from '@/components/ui/button/Button';
import { Form } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/input/Input';
import { Modal } from '@/components/ui/modal/Modal';
import { ProfessorSelect } from '@/components/ui/professorSelect/ProfessorSelect';
import { updateSubject } from '@/redux/slices/subjectSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch } from '@/redux/store';
import { INotification } from '@/types/slices/INotificationSlice';
import { ISubjectComplete } from '@/types/interfaces/ISubjectComplete';
import { FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as z from 'zod';

type Props = {
  item: ISubjectComplete;
};

export const UpdateSubjectButton = ({ item }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<RootDispatch>();
  const nameRef = useRef<HTMLInputElement>(null);
  const professorIdRef = useRef<HTMLSelectElement>(null);

  const subjectSchema = z.object({
    name: z.string().min(2, 'Name must have at least 2 characters'),
    professorId: z.number(),
  });

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();

    const name = nameRef.current?.value;
    const professorId = professorIdRef.current?.value;

    try {
      const result = await subjectSchema.safeParseAsync({ name, professorId: Number(professorId) });

      if (!result.success) {
        const firstError = result.error.issues[0].message;
        dispatch(setNotification({ type: 'error', message: firstError }));
        return;
      }

      const response = await dispatch(
        updateSubject({
          subjectId: item.id,
          name: result.data.name,
          professorId: result.data.professorId,
        }),
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
        <Modal onClose={() => setIsModalOpen(false)} title="Update Subject">
          <Form onSubmit={(e) => handleUpdate(e)}>
            <Input
              label={'Name'}
              type={'text'}
              minValue={2}
              maxValue={100}
              ref={nameRef}
              defaultValue={item.name}
            />
            <ProfessorSelect ref={professorIdRef} />
            <Button label={'Update'} type="submit" />
          </Form>
        </Modal>
      )}
    </>
  );
};
