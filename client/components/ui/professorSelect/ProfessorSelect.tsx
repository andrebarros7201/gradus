import { RootDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from '../select/Select';
import { Ref, useEffect } from 'react';
import { fetchAllProfessors } from '@/redux/slices/professorSlice';
import { ISubjectComplete } from '@/types/ISubjectComplete';
import { IUserProfessor } from '@/types/IUser';

type Props = {
  ref: Ref<HTMLSelectElement>;
  item: ISubjectComplete;
};

export const ProfessorSelect = ({ ref, item }: Props) => {
  const { professorList, isLoading } = useSelector((state: RootState) => state.professorSlice);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(fetchAllProfessors());
  }, [dispatch]);

  if (!isLoading && professorList) {
    return (
      <Select label={'Professor'} ref={ref}>
        {professorList.map((prof: IUserProfessor) => (
          <option key={prof.professor.id} value={prof.professor.id}>
            {prof.name}
          </option>
        ))}
      </Select>
    );
  }
};
