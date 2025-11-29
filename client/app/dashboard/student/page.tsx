import { ProtectedRouteAdmin } from '@/components/admin/ProtectRouteAdmin';
import { Page } from '@/components/page/Page';

export default function StudentPage() {
  return (
    <ProtectedRouteAdmin>
      <Page>
        <h3>Student Management</h3>
      </Page>
    </ProtectedRouteAdmin>
  );
}
