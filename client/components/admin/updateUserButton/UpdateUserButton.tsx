import classes from './updateUserForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import { Button } from '@/components/ui/button/Button';
import { Modal } from '@/components/ui/modal/Modal';
import { Form } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/input/Input';
import { IClassSimple } from '@/types/IClassSimple';
import { SchoolYearSelect } from '@/components/ui/schoolYearSelect/SchoolYearSelect';
import * as z from 'zod';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '@/redux/store';
import { setNotification } from '@/redux/slices/notificationSlice';
import { INotification } from '@/types/INotificationSlice';
import { updateUser } from '@/redux/slices/userSlice';

type ClassProps = {
  type: 'class';
  item: IClassSimple;
};

type Props = ClassProps;
// TODO allow the class to change school year and fix modal style bug

export const UpdateUserButton = ({ item, type }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<RootDispatch>();

  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const schoolYearRef = useRef<HTMLSelectElement>(null);

  const updateUserSchema = z
    .object({
      name: z.string().nonempty('Name is required').min(3, 'Name must have at least 3 characters'),
      username: z
        .string()
        .nonempty('Username is required')
        .min(3, 'Username must have at least 3 characters'),
      schoolYear: z.string().optional(),
    })
    .refine(
      (data) => {
        if (type === 'class') return !!data.schoolYear;
        return true;
      },
      {
        message: 'School Year is required',
        path: ['schoolYear'],
      },
    );

  async function onSubmit(e: FormEvent) {
    // Prevent default form submit behavior
    e.preventDefault();

    const name = nameRef.current?.value;
    const username = usernameRef.current?.value;
    const schoolYear = schoolYearRef.current?.value;

    try {
      const result = updateUserSchema.safeParse({ name, username, schoolYear });

      if (!result.success) {
        const firstError = result.error.issues[0].message || 'Invalid Input';
        dispatch(setNotification({ type: 'error', message: firstError }));
        return;
      }
      const response = await dispatch(
        updateUser({
          userId: item.userId,
          name: result.data.name,
          username: result.data.username,
          schoolYear: result.data.schoolYear,
          type: 'class',
        }),
      ).unwrap();

      const { notification } = response;
      dispatch(setNotification(notification));

      nameRef.current!.value = '';
      usernameRef.current!.value = '';
      //passwordRef.current!.value = '';
      if (schoolYearRef.current) schoolYearRef.current.value = '2025/26';
      setIsModalOpen(false);
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }

  return (
    <>
      <Button label={'Update'} variant={'secondary'} onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title={'Update Class'}>
          <Form onSubmit={onSubmit}>
            <Input
              label={'Name'}
              type={'text'}
              defaultValue={item.name}
              minValue={3}
              maxValue={100}
              ref={nameRef}
            />
            <Input
              label={'Username'}
              type={'text'}
              defaultValue={item.username}
              minValue={3}
              maxValue={100}
              ref={usernameRef}
            />
            {type === 'class' && <SchoolYearSelect ref={schoolYearRef} />}
            <Button label={'Update'} type={'submit'} />
          </Form>
        </Modal>
      )}
    </>
  );
};
