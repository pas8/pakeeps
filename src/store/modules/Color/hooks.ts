import { RootStoreType } from "models/interfaces";
import { useSelector } from "react-redux";

export const useColorSelector = () => {
  const color = useSelector(({ color }: RootStoreType) => color);
  return color;
};
