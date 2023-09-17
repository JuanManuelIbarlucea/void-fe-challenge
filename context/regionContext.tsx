import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import axios from "axios";

export const regions = ["na", "eu", "ap", "kr", "latam", "br"] as const;
export type RegionType = (typeof regions)[number];

type RegionContextProps = {
  region: RegionType;
  setRegion: Dispatch<SetStateAction<RegionType>>;
};
const RegionContext = createContext<RegionContextProps>({
  setRegion: () => {},
  region: "na",
});

axios.defaults.baseURL = "https://api.henrikdev.xyz";

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<RegionType>("na");

  return (
    <RegionContext.Provider value={{ setRegion, region }}>
      {children}
    </RegionContext.Provider>
  );
}

export const useRegion = () => useContext(RegionContext);
