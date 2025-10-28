'use client';

import { Page } from '@/components/page/Page';
import classes from './page.module.scss';
import { Form } from '@/components/ui/form/Form';
import { FormEvent, useRef } from 'react';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '@/redux/store';
import { loginUser } from '@/redux/slices/userSlice';
import { showNotification } from '@/redux/slices/notificationSlice';

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
      await dispatch(loginUser({ username, password })).unwrap();
      dispatch(showNotification({ message: 'Login successful!', type: 'success' }));
    } catch (err) {
      dispatch(showNotification({ message: (err as string) || 'Login failed!', type: 'error' }));
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
