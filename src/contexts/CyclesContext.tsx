import { differenceInSeconds } from 'date-fns'
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react'
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions'
import {  Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CylesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CylesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  }, () => {
    const storedStateAsJSON = localStorage.getItem(
      '@ignite-manager-task-time:cycles-state-1.0.0'
    )

    if(storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }
  },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(),new Date(activeCycle.startDate))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-manager-task-time:cycles-state-1.0.0', stateJSON)

  },[cyclesState])

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
