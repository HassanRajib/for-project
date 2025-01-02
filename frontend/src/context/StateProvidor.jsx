import React, { useContext, useReducer, createContext } from "react";

export const StateContext = createContext();

export const StateProvider = ({
  reducer,
  initialState,
  children,
}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error(
      "useStateValue must be used within a StateProvider."
    );
  }
  return context;
};
