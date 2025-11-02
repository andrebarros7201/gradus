import { Ref } from 'react';
import { Select } from '../select/Select';

type Props = {
  ref: Ref<HTMLSelectElement>;
};
export const SchoolYearSelect = ({ ref }: Props) => {
  return (
    <Select label={'School Year'} ref={ref}>
      <option value={'2025/26'}>2025/26</option>
    </Select>
  );
};
