'use client';

import { Page } from '@/components/page/Page';
import classes from './page.module.scss';
import { Form } from '@/components/ui/form/Form';
import { FormEvent, useRef } from 'react';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '@/redux/store';
import { userLogin } from '@/redux/slices/userSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { INotification } from '@/types/INotificationSlice';

export default function LoginPage() {
  const dispatch = useDispatch<RootDispatch>();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: FormEvent) {
    // Prevent Default Behavior
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    // Cancel if values are missing
    if (!username || !password) return;

    try {
      const response = await dispatch(userLogin({ username, password })).unwrap();
      const { notification } = response;
      dispatch(setNotification(notification));
    } catch (err) {
      const { notification } = err as { notification: INotification };
      dispatch(setNotification(notification));
    }
  }

  return (
    <Page>
      <Form label="Login" onSubmit={(e) => onSubmit(e)}>
        <Input label={'Username'} type={'text'} minValue={3} maxValue={100} ref={usernameRef} />
        <Input label={'Password'} type={'password'} minValue={3} maxValue={100} ref={passwordRef} />
        <Button label={'Login'} type={'submit'} />
      </Form>
    </Page>
  );
}
