import { TActivity } from "../types";

export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: TActivity } }
  | { type: "set-activeId"; payload: { id: TActivity["id"] } }
  | { type: "deleted-activity"; payload: { id: TActivity["id"] } }
  | { type: "restart-app" };

export type ActivityState = {
  activities: TActivity[];
  activeId: TActivity["id"];
};

const localStorageActivities = (): TActivity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    //Este codigo maneja lo logico para actualizar el state
    let updateActivities: TActivity[] = [];

    if (state.activeId) {
      updateActivities = state.activities.map((stateActivity) =>
        stateActivity.id === state.activeId
          ? action.payload.newActivity
          : stateActivity
      );
    } else {
      updateActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updateActivities,
      activeId: "",
    };
  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "deleted-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }

  if (action.type === "restart-app") {
    return {
      activities: [],
      activeId: "",
    };
  }

  return state;
};
