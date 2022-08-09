import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer, MinutesAmount, TaskInput } from './styles'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no min. 05 minutos')
    .max(60, 'O ciclo precisa ser de no max. 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCyleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task"> Trabalhando em </label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Nome do projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Propjeto 1" />
        <option value="Propjeto 2" />
        <option value="Propjeto 4" />
        <option value="Manga" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmount
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
