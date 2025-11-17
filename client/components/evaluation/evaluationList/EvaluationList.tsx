import { List } from '@/components/ui/list/List';
import { IEvaluation } from '@/types/IEvaluation';

type Props = {
  list: IEvaluation[];
};
export const EvaluationList = ({ list }: Props) => {
  return <List list={list} type="evaluation" />;
};
