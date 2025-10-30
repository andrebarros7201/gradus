'use client';

import { Page } from '@/components/page/Page';
//import classes from './page.module.scss';
import { Form } from '@/components/ui/form/Form';
import { FormEvent, useRef } from 'react';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';
import { RootDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setNotification } from '@/redux/slices/notificationSlice';
import { userRegister } from '@/redux/slices/userSlice';
import { UserRegisterSelect } from '@/components/ui/userRegisterSelect/UserRegisterSelect';
import { INotification } from '@/types/INotificationSlice';
import * as z from 'zod';
import { ProtectedRouteAdmin } from '@/components/admin/ProtectRouteAdmin';

export default function RegisterPage() {
  const dispatch = useDispatch<RootDispatch>();

  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);
  const schoolYearRef = useRef<HTMLSelectElement>(null);

  const userRegisterSchema = z
    .object({
      name: z.string().nonempty('Name is required').min(3, 'Name must have at least 3 characters'),
      username: z
        .string()
        .nonempty('Username is required')
        .min(3, 'Username must have at least 3 characters'),
      password: z
        .string()
        .nonempty('Password is required')
        .min(3, 'Password must have at least 3 characters'),
      role: z.string(),
      schoolYear: z.string().optional(), // Only required if role is Class
    })
    // Requires School Year if role is class
    .refine(
      (data) => {
        if (data.role === '1') return !!data.schoolYear;
        return true;
      },
      {
        message: 'School Year is required if user role is Class',
        path: ['schoolYear'],
      },
    );

  async function onSubmit(e: FormEvent) {
    // Prevent default form submission behavior
    e.preventDefault();

    const name = nameRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const role = roleRef.current?.value;
    const schoolYear = schoolYearRef.current?.value;

    try {
      // Validate data
      const result = userRegisterSchema.safeParse({ username, name, password, role, schoolYear });

      // Check for errors
      if (!result.success) {
        const firstError = result.error.issues[0].message || 'Invalid Input';
        dispatch(setNotification({ type: 'error', message: firstError }));
        return;
      }

      const response = await dispatch(
        userRegister({
          name: result.data.name,
          username: result.data.username,
          password: result.data.password,
          role: Number(result.data.role),
          schoolYear: result.data.schoolYear,
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

  return (
    <ProtectedRouteAdmin>
      <Page>
        <Form label="Register" onSubmit={(e) => onSubmit(e)}>
          <Input label={'Name'} type={'text'} minValue={3} maxValue={100} ref={nameRef} />
          <Input label={'Username'} type={'text'} minValue={3} maxValue={100} ref={usernameRef} />
          <Input
            label={'Password'}
            type={'password'}
            minValue={3}
            maxValue={100}
            ref={passwordRef}
          />
          <UserRegisterSelect roleRef={roleRef} schoolYearRef={schoolYearRef} />
          <Button label={'Register'} type={'submit'} />
        </Form>
      </Page>
    </ProtectedRouteAdmin>
  );
}
