import { Button } from '@/components/ui/button/Button';
import classes from './classViewToggler.module.scss';
import { List } from '@/components/ui/list/List';
import { IClassComplete } from '@/types/IClassComplete';
import { useState } from 'react';

type Props = {
  item: IClassComplete;
};

export const ClassViewToggler = ({ item }: Props) => {
  const [index, setIndex] = useState<number>(0);

  const views = [
    { label: 'Students', component: <List type="student" list={item.students} /> },
    { label: 'Subjects', component: <List type="subject" list={item.subjects} /> },
  ];

  return (
    <main className={classes.view}>
      <div className={classes['view__button-group']}>
        {views.map((item, index) => (
          <Button label={item.label} key={item.label} onClick={() => setIndex(index)} />
        ))}
      </div>
      <div className={classes['view__component']}>{views[index].component}</div>
    </main>
  );
};
