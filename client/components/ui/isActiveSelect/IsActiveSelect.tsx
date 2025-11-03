import { Ref } from 'react';
import { Select } from '../select/Select';

type Props = {
  ref: Ref<HTMLSelectElement>;
};
export const IsActiveSelect = ({ ref }: Props) => {
  return (
    <Select label={'Is Active'} ref={ref}>
      <option value="0">No</option>
      <option value="1">Yes</option>
    </Select>
  );
};
