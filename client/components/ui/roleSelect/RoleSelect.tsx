import { Ref } from 'react';
import { Select } from '../select/Select';

type Props = {
  ref: Ref<HTMLSelectElement>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const RoleSelect = ({ ref, onChange }: Props) => {
  return (
    <Select label={'Role'} onChange={onChange} ref={ref}>
      <option value={'0'}>Admin</option>
      <option value={'1'}>Class</option>
      <option value={'2'}>Professor</option>
    </Select>
  );
};
