import classes from './listItem.module.scss';
import { IEvaluation } from '@/types/IEvaluation';
import { EvaluationType } from '@/types/EvaluationEnum';
import { ToggleViewGradeButton } from '@/components/admin/evaluationButton/toggleViewGradeButton/ToggleViewGradeButton';
import { useState } from 'react';
import { List } from '../List';
import { DeleteEvaluationButton } from '@/components/admin/evaluationButton/deleteEvaluationButton/DeleteEvaluationButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Role } from '@/types/RoleEnum';
import { UpdateEvaluationButton } from '@/components/admin/evaluationButton/updateEvaluationButton/UpdateEvaluationButton';
import { CreateGradeButton } from '@/components/admin/gradeButton/CreateGradeButton';

type Props = {
  item: IEvaluation;
};

export const EvaluationListItem = ({ item }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [isListOpen, setIsListOpen] = useState(false);
  return (
    <div className={classes['wrapper']}>
      <div className={classes['item']}>
        <div className={classes['item__field']}>
          <p className={classes['item__label']}>Id</p>
          <p>{item.id}</p>
        </div>
        <div className={classes['item__field']}>
          <p className={classes['item__label']}>Name</p>
          <p>{item.name}</p>
        </div>
        <div className={classes['item__field']}>
          <p className={classes['item__label']}>Date</p>
          <p>{new Date(item.date).toLocaleDateString('PT')}</p>
        </div>
        <div className={classes['item__field']}>
          <p className={classes['item__label']}>Type</p>
          <p>{item.evaluationType === EvaluationType.Exam ? 'Exam' : 'Presentation'}</p>
        </div>
        <div className={classes['item__buttons']}>
          <p className={classes['item__label']}>Actions</p>
          {(user?.role === Role.Admin || user?.role === Role.Professor) && (
            <UpdateEvaluationButton evaluation={item} />
          )}
          {(user?.role === Role.Admin || user?.role === Role.Professor) && (
            <DeleteEvaluationButton evaluationId={item.id} />
          )}
          <ToggleViewGradeButton
            label={isListOpen ? 'Close' : 'Open'}
            onClick={() => setIsListOpen((prev) => !prev)}
          />
        </div>
      </div>
      <div className={classes['item__list-wrapper']}>
        {isListOpen && (
          <>
            {(user?.role === Role.Admin || user?.role === Role.Professor) && (
              <CreateGradeButton evaluationId={item.id} />
            )}
            <List list={item.grades} type="grade" />
          </>
        )}
      </div>
    </div>
  );
};
