import {PropsWithChildren} from "react";
import StorageActionModalsProvider from "../StorageActionModalsProvider./StorageActionModalsProvider";

const ModalsProvider = (props: PropsWithChildren) => {
  return (
    <StorageActionModalsProvider>
      {props.children}
    </StorageActionModalsProvider>
  )
}

export default ModalsProvider;