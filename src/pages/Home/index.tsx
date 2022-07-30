import { Play } from "phosphor-react";

import { useForm } from "react-hook-form";

import {
  CountdownContainer,
  HomeContainer,
  FormContainer,
  Separator,
  StartCountdownButton,
  MinutesAmount,
  TaskInput,
} from "./styles";

export function Home() {
  const { register, handleSubmit, watch } = useForm();

  function handleCreateNewCycle(data: any) {
    console.log(data);
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task"> Trabalhando em </label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Nome do projeto"
            {...register("task")}
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
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          Comecar
          <Play size={24} />
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
