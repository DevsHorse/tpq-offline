import React, {PropsWithChildren, useMemo} from 'react';
import {Provider} from "react-redux";
import {type DeepPartial} from "@reduxjs/toolkit";
import {StateSchema} from "../config/StateSchema";
import {createReduxStore} from "../config/store";

interface StoreProviderProps extends PropsWithChildren {
  initialState?: DeepPartial<StateSchema>
}

const StoreProvider = (props: StoreProviderProps) => {
  const appStore = useMemo(() => {
    return createReduxStore(props.initialState as StateSchema);
  }, [props.initialState]);

  return (
    <Provider store={appStore}>
      {props.children}
    </Provider>
  );
};

export default StoreProvider;