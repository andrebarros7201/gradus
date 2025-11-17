import { Button } from '@/components/ui/button/Button';
import { DatePicker } from '@/components/ui/datePicker/DatePicker';
import { EvaluationTypeSelect } from '@/components/ui/evaluationTypeSelect/EvaluationTypeSelect';
import { Form } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/input/Input';
import { Modal } from '@/components/ui/modal/Modal';
import { createEvaluation } from '@/redux/slices/currentSubjectSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch, RootState } from '@/redux/store';
import { INotification } from '@/types/INotificationSlice';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as z from 'zod';

export const CreateEvaluationButton = () => {
  const { currentSubject } = useSelector((state: RootState) => state.currentSubject);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<RootDispatch>();

  const nameRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const [date, setDate] = useState(Date);

  const formSchema = z.object({
    name: z.string().nonempty().min(3, 'Name should have at least 3 characters'),
    type: z.number(),
    date: z.string(),
  });

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();

    const name = nameRef.current?.value;
    const type = typeRef.current?.value;

    try {
      const result = await formSchema.safeParseAsync({ name, type: Number(type), date });

      if (!result.success) {
        const firstError = result.error.issues[0].message;
        dispatch(setNotification({ type: 'error', message: firstError }));
        return;
      }

      const response = await dispatch(
        createEvaluation({
          date: String(result.data.date),
          name: result.data.name,
          subjectId: currentSubject!.id,
          type: result.data.type,
        }),
      ).unwrap();

      const { notification } = response;
      dispatch(setNotification(notification));
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }

  return (
    <>
      <Button label={'Create Evaluation'} onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <Modal title="Create Evaluation" onClose={() => setIsModalOpen(false)}>
          <Form onSubmit={(e) => handleCreate(e)}>
            <Input label={'Name'} type={'text'} minValue={3} maxValue={100} ref={nameRef} />
            <EvaluationTypeSelect ref={typeRef} />
            <DatePicker onChange={handleDateChange} />
            <Button label={'Create'} type="submit" />
          </Form>
        </Modal>
      )}
    </>
  );
};
