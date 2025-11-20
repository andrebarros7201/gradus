import { Ref } from 'react';
import { Select } from '../select/Select';
import { EvaluationType } from '@/types/enums/EvaluationEnum';

type Props = {
  ref: Ref<HTMLSelectElement>;
};

export const EvaluationTypeSelect = ({ ref }: Props) => {
  const evaluation_types = Object.entries(EvaluationType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key,
      value: value,
    }));

  return (
    <Select label={'Evaluation Type'} ref={ref}>
      {evaluation_types.map((t) => (
        <option value={t.value} key={t.value}>
          {t.label}
        </option>
      ))}
    </Select>
  );
};
