import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function Page() {
  return (
    <Suspense fallback={<p className="p-10">Loading...</p>}>
      <LoginClient />
    </Suspense>
  );
}