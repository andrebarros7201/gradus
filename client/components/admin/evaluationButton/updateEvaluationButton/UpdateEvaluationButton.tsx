import { Button } from '@/components/ui/button/Button';
import { DatePicker } from '@/components/ui/datePicker/DatePicker';
import { EvaluationTypeSelect } from '@/components/ui/evaluationTypeSelect/EvaluationTypeSelect';
import { Form } from '@/components/ui/form/Form';
import { Input } from '@/components/ui/input/Input';
import { Modal } from '@/components/ui/modal/Modal';
import { updateEvaluation } from '@/redux/slices/currentSubjectSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch } from '@/redux/store';
import { IEvaluation } from '@/types/IEvaluation';
import { INotification } from '@/types/slices/INotificationSlice';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as z from 'zod';

type Props = {
  evaluation: IEvaluation;
};

export const UpdateEvaluationButton = ({ evaluation }: Props) => {
  const dispatch = useDispatch<RootDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const [date, setDate] = useState(Date);

  const formSchema = z.object({
    name: z.string().nonempty().min(3, 'Name should have at least 3 characters'),
    type: z.number(),
    date: z.string(),
  });

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    setDate(() => e.target.value);
  }

  async function handleUpdate(e: FormEvent) {
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
        updateEvaluation({
          date: String(result.data.date),
          name: result.data.name,
          type: result.data.type,
          evaluationId: evaluation.id,
          subjectId: evaluation.subjectId,
        }),
      ).unwrap();

      const { notification } = response;
      dispatch(setNotification(notification));
      setIsModalOpen(() => false);
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }

  return (
    <>
      <Button label={'Update'} variant="secondary" onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <Modal title="Update Evaluation" onClose={() => setIsModalOpen(false)}>
          <Form onSubmit={(e) => handleUpdate(e)}>
            <Input
              label={'Name'}
              type={'text'}
              minValue={2}
              maxValue={100}
              ref={nameRef}
              defaultValue={evaluation.name}
            />
            <EvaluationTypeSelect ref={typeRef} />
            <DatePicker onChange={handleDateChange} />
            <Button label={'Update'} type="submit" />
          </Form>
        </Modal>
      )}
    </>
  );
};
