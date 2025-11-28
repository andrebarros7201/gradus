'use client';

import { ClassList } from '@/components/classList/ClassList';
import { Page } from '@/components/page/Page';

export default function ClassPage() {
  return (
    <Page>
      <h3>Class Management</h3>
      <ClassList />
    </Page>
  );
}
