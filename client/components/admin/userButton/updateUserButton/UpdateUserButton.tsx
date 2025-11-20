import classes from './updateUserForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import { Button } from '@/components/ui/button/Button';
import { Modal } from '@/components/ui/modal/Modal';
import { Form } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/input/Input';
import { IClassSimple } from '@/types/interfaces/IClassSimple';
import { SchoolYearSelect } from '@/components/ui/schoolYearSelect/SchoolYearSelect';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '@/redux/store';
import { setNotification } from '@/redux/slices/notificationSlice';
import { INotification } from '@/types/slices/INotificationSlice';
import { updateUser } from '@/redux/slices/userSlice';
import { IsActiveSelect } from '@/components/ui/isActiveSelect/IsActiveSelect';
import { IClassComplete } from '@/types/interfaces/IClassComplete';
import { Role } from '@/types/enums/RoleEnum';

type ClassProps = {
  type: 'class';
  item: IClassSimple | IClassComplete;
};

type Props = ClassProps;

export const UpdateUserButton = ({ item, type }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<RootDispatch>();

  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const schoolYearRef = useRef<HTMLSelectElement>(null);
  const isActiveRef = useRef<HTMLSelectElement>(null);

  const updateUserSchema = z.discriminatedUnion('type', [
    z.object({
      type: z.literal('class'),
      name: z.string().nonempty('Name is required').min(3, 'Name must have at least 3 characters'),
      username: z
        .string()
        .nonempty('Username is required')
        .min(3, 'Username must have at least 3 characters'),
      schoolYear: z.string('School Year is required'),
      isActive: z.string('Is Active is required'),
    }),
    z.object({
      type: z.union([z.literal('professor'), z.literal('admin')]),
      name: z.string().nonempty('Name is required').min(3, 'Name must have at least 3 characters'),
      username: z
        .string()
        .nonempty('Username is required')
        .min(3, 'Username must have at least 3 characters'),
    }),
  ]);

  async function onSubmit(e: FormEvent) {
    // Prevent default form submit behavior
    e.preventDefault();

    const name = nameRef.current?.value;
    const username = usernameRef.current?.value;
    const schoolYear = schoolYearRef.current?.value;
    const isActive = isActiveRef.current?.value;

    try {
      const result = updateUserSchema.safeParse({ type, name, username, schoolYear, isActive });

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
          type,
          ...(result.data.type === 'class'
            ? {
                schoolYear: result.data.schoolYear,
                isActive: result.data.isActive === '0' ? false : true,
              }
            : null),
        }),
      ).unwrap();

      const { notification } = response;
      dispatch(setNotification(notification));

      nameRef.current!.value = '';
      usernameRef.current!.value = '';
      //passwordRef.current!.value = '';
      if (schoolYearRef.current) schoolYearRef.current.value = '2025/26';
      if (isActiveRef.current) isActiveRef.current.value = '1';
      setIsModalOpen(false);
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }

  return (
    <>
      {/* Only Admins can update*/}
      {user?.role === Role.Admin && (
        <Button label={'Update'} variant={'secondary'} onClick={() => setIsModalOpen(true)} />
      )}
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
            {type === 'class' && (
              <>
                <SchoolYearSelect ref={schoolYearRef} />
                <IsActiveSelect ref={isActiveRef} />
              </>
            )}

            <Button label={'Update'} type={'submit'} />
          </Form>
        </Modal>
      )}
    </>
  );
};
