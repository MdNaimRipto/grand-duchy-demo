import OpacityAnimation from "@/components/animation/OpacityAnimation";
import MainLayout from "@/Layouts/MainLayout";
import { ReactElement } from "react";

export default function Home() {
  return (
    <OpacityAnimation>
      <div>
        <h2>Demo Landing Page</h2>
      </div>
    </OpacityAnimation>
  );
}

Home.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
