'use client';

import { Page } from '@/components/page/Page';
//import classes from './page.module.scss';
import { ProtectedRouteAdmin } from '@/components/admin/ProtectRouteAdmin';
import { CreateUserForm } from '@/components/admin/createUserForm/CreateUserForm';

export default function RegisterPage() {
  return (
    <ProtectedRouteAdmin>
      <Page>
        <CreateUserForm />
      </Page>
    </ProtectedRouteAdmin>
  );
}
