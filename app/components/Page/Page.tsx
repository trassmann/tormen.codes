import * as React from "react";

import Navigation from "@components/Navigation";

type Props = {
  children?: React.ReactNode;
};

export default function Page({ children }: Props) {
  return (
    <main className="h-full flex flex-col justify-center items-center bg-slate-100">
      <Navigation />
      <div className="max-w-5xl w-full h-full py-6 xl:px-0 px-8">
        {children}
      </div>
    </main>
  );
}
