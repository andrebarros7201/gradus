import { useState } from 'react';
import { Select } from '../select/Select';

type Props = {
  roleRef: React.Ref<HTMLSelectElement>;
  schoolYearRef: React.Ref<HTMLSelectElement>;
};
export const UserRegisterSelect = ({ roleRef, schoolYearRef }: Props) => {
  const [value, setValue] = useState<number>(0);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setValue(Number(e.target.value));
  }

  return (
    <>
      <Select label="User Role" ref={roleRef} onChange={handleChange}>
        <option value="0">Admin</option>
        <option value="1">Class</option>
        <option value="2">Professor</option>
      </Select>
      {
        // Show School Year select only if "Class" role is selected
        value === 1 && (
          <Select label="School Year" ref={schoolYearRef}>
            <option value="2025/26">2025/26</option>
          </Select>
        )
      }
    </>
  );
};
