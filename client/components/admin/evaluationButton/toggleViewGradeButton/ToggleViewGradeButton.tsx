import { Button } from '@/components/ui/button/Button';

type Props = {
  onClick: () => void;
  label: string;
};
export const ToggleViewGradeButton = ({ onClick, label }: Props) => {
  return <Button label={label} onClick={onClick} />;
};
