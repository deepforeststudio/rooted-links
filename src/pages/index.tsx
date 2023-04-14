import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import { getBaseServerData } from "../data/getServerData";
import { HeadBase } from "../components/Head";
import { BaseApp } from "../components/BaseApp";

const App = (props: PageProps) => {
  return <BaseApp {...props} />;
};

export default App;

export async function getServerData() {
  return getBaseServerData();
}

export const Head: HeadFC = HeadBase;
