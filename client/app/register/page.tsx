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

export default function RegisterPage() {
  const { user } = useSelector((state: RootState) => state.user);

  const router = useRouter();
  const dispatch = useDispatch<RootDispatch>();

  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Verify if user is admin
  useEffect(() => {
    if (!user || user.role !== Role.Admin) {
      router.push('/login');
      dispatch(
        setNotification({
          type: 'error',
          message: 'You must be an admin to access the registration page.',
        }),
      );
    }
  }, [dispatch, router, user]);

  function onSubmit(e: FormEvent) {
    // Prevent default form submission behavior
    e.preventDefault();

    const name = nameRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
  }

  return (
    <Page>
      <Form label="Register" onSubmit={(e) => onSubmit(e)}>
        <Input label={'Name'} type={'text'} minValue={3} maxValue={100} ref={nameRef} />
        <Input label={'Username'} type={'text'} minValue={3} maxValue={100} ref={usernameRef} />
        <Input label={'Password'} type={'password'} minValue={3} maxValue={100} ref={passwordRef} />
        <Button label={'Register'} type={'submit'} />
      </Form>
    </Page>
  );
}
