import { Metadata as NextMetadata } from "next";

type Metadata = NextMetadata & {
  name: string;
  path: string;
  showNav?: boolean;
  menuName?: string;
  showMenu?: boolean;
  menuOrder?: number;
};

export const generateMetaData = (metadata: Metadata): Metadata => {
  return metadata;
};
