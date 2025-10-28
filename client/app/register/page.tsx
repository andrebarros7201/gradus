'use client';

import { Page } from '@/components/page/Page';
import classes from './page.module.scss';
import { Form } from '@/components/ui/form/Form';
import { FormEvent, useRef } from 'react';
import { Input } from '@/components/ui/input/Input';
import { Button } from '@/components/ui/button/Button';

export default function RegisterPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
