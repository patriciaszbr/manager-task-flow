import { Play } from "phosphor-react";

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
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task"> Trabalhando em </label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Nome do projeto"
          />

          <datalist id="task-suggestions">
            <option value="Propjeto 1" />
            <option value="Propjeto 2" />
            <option value="Propjeto 4" />
            <option value="Manga" />
          </datalist>

          <label htmlFor="minutesAmount"> Trabalhando em </label>
          <MinutesAmount
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={90}
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

        <StartCountdownButton type="submit" disabled>
          Comecar
          <Play size={24} />
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
