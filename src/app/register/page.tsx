import { Suspense } from "react";
import RegisterClient from "./RegisterClient";

export default function Page() {
  return (
    <Suspense fallback={<p className="p-10">Loading...</p>}>
      <RegisterClient />
    </Suspense>
  );
}