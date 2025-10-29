'use client';

import { Page } from '@/components/page/Page';
import classes from './page.module.scss';
import { Form } from '@/components/ui/form/Form';
import { FormEvent, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';
import { RootDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Role } from '@/types/RoleEnum';
import { setNotification } from '@/redux/slices/notificationSlice';
import { userRegister } from '@/redux/slices/userSlice';
import { UserRegisterSelect } from '@/components/ui/userRegisterSelect/UserRegisterSelect';
import { INotification } from '@/types/INotificationSlice';

export default function RegisterPage() {
  const { user } = useSelector((state: RootState) => state.user);

  const router = useRouter();
  const dispatch = useDispatch<RootDispatch>();

  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const schoolYearRef = useRef<HTMLSelectElement>(null);

  async function onSubmit(e: FormEvent) {
    // Prevent default form submission behavior
    e.preventDefault();

    const name = nameRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const role = roleRef.current?.value;
    const schoolYear = schoolYearRef.current?.value;

    console.log({ name, username, password, role, schoolYear });

    if (!name || !username || !password || !role || (Number(role) === 1 && !schoolYear)) return;

    try {
      const response = await dispatch(
        userRegister({
          name,
          username,
          password,
          role: Number(role),
          schoolYear: schoolYear || '',
        }),
      ).unwrap();

      dispatch(setNotification(response.notification));

      // Clear form fields
      nameRef.current!.value = '';
      usernameRef.current!.value = '';
      passwordRef.current!.value = '';
      roleRef.current!.value = '0';
      if (schoolYearRef.current) schoolYearRef.current.value = '2025/26';
    } catch (error) {
      const { notification } = error as { notification: INotification };
      dispatch(setNotification(notification));
    }
  }

  useEffect(() => {
    if (!user || user.role !== Role.Admin) {
      dispatch(
        setNotification({
          type: 'error',
          message: 'You must be an admin to access the registration page.',
        }),
      );
      router.replace('/login');
    }
  }, [user, dispatch, router]);

  if (!user || user.role !== Role.Admin) {
    return null;
  }

  return (
    <Page>
      <Form label="Register" onSubmit={(e) => onSubmit(e)}>
        <Input label={'Name'} type={'text'} minValue={3} maxValue={100} ref={nameRef} />
        <Input label={'Username'} type={'text'} minValue={3} maxValue={100} ref={usernameRef} />
        <Input label={'Password'} type={'password'} minValue={3} maxValue={100} ref={passwordRef} />
        <UserRegisterSelect roleRef={roleRef} schoolYearRef={schoolYearRef} />
        <Button label={'Register'} type={'submit'} />
      </Form>
    </Page>
  );
}
