import { Ref } from 'react';
import { Select } from '../select/Select';

type Props = {
  ref: Ref<HTMLSelectElement>;
};
export const GradeValueSelect = ({ ref }: Props) => {
  return (
    <Select label={'Value'} ref={ref}>
      {Array.from({ length: 21 }, (_, i) => i ).map((index) => (
        <option key={index} value={index}>
          {index}
        </option>
      ))}
    </Select>
  );
};
