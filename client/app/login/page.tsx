"use client";

import { Page } from '@/components/page/Page';
import classes from './page.module.scss';
import { Form } from '@/components/ui/form/Form';
import { FormEvent, useRef } from 'react';
import { Button } from '@/components/ui/button/Button';
import { Input } from '@/components/ui/input/Input';

export default function LoginPage() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
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
