import { Ref } from 'react';
import { Select } from '../select/Select';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

type Props = {
  ref: Ref<HTMLSelectElement>;
};
export const StudentSelect = ({ ref }: Props) => {
  const { currentClass } = useSelector((state: RootState) => state.currentClass);
  return (
    <Select label={'Student'} ref={ref}>
      {currentClass?.students.map((student) => (
        <option key={student.id} value={student.id}>
          {student.name}
        </option>
      ))}
    </Select>
  );
};
