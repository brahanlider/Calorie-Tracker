import { createContext, Dispatch, ReactNode, useReducer } from "react"
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activity-reducer"


type ActivityContextProps = {
  state: ActivityState,
  dispatch: Dispatch<ActivityActions>
}

type ActivityProviderProps = {
  children: ReactNode
}

export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps)

export const ActivityProvider = ({ children }: ActivityProviderProps) => {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </ActivityContext.Provider>
  )

}