'use client';

import { Page } from '@/components/page/Page';
//import classes from './page.module.scss';
import { Form } from '@/components/ui/form/Form';
import { FormEvent, useRef } from 'react';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '@/redux/store';
import { userLogin } from '@/redux/slices/userSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { INotification } from '@/types/slices/INotificationSlice';
import * as z from 'zod';

export default function LoginPage() {
  const dispatch = useDispatch<RootDispatch>();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Login Schema for Zod
  const loginSchema = z.object({
    username: z
      .string()
      .nonempty('The field username is required')
      .min(3, 'Username must have at least 3 characters'),
    password: z
      .string()
      .nonempty('The field password is required')
      .min(3, 'Password must have at least 3 characters'),
  });

  async function onSubmit(e: FormEvent) {
    // Prevent Default Behavior
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      // Validate user data
      const result = await loginSchema.safeParseAsync({ username, password });

      // Validation failed
      if (!result.success) {
        const firstError = result.error.issues[0].message || 'Invalid Input';
        dispatch(setNotification({ type: 'error', message: firstError }));
        return;
      }

      const response = await dispatch(
        userLogin({
          username: result.data?.username,
          password: result.data?.password,
        }),
      ).unwrap();

      const { notification } = response;
      dispatch(setNotification(notification));
    } catch (err) {
      if (err instanceof z.ZodError) {
      }
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
