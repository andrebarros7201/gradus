import { ProtectedRouteAdmin } from '@/components/admin/ProtectRouteAdmin';
import { StudentList } from '@/components/admin/studentList/StudentList';
import { Page } from '@/components/page/Page';

export default function StudentPage() {
  return (
    <ProtectedRouteAdmin>
      <Page>
        <h3>Student Management</h3>
        <StudentList />
      </Page>
    </ProtectedRouteAdmin>
  );
}
