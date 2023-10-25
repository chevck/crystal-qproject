"use client";
import { useState } from "react";
import Register from "./pages/register";
import IntroScreen from "./pages/intro";
import QuestionPageRenderer from "./pages/components/questions.page";

export default function Home() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState({ name: "", email: "" });

  const moveToNextPage = (page: number) => setPage(page);

  const renderComponent = (page: number) => {
    switch (page) {
      case 0:
        return (
          <Register
            setData={setData}
            data={data}
            nextPage={() => moveToNextPage(1)}
          />
        );
      case 1:
        return (
          <IntroScreen name={data.name} nextPage={() => moveToNextPage(2)} />
        );
      case 2:
        return <QuestionPageRenderer />;
      default:
        return null;
    }
  };

  return (
    <main className='min-h-screen items-center justify-between p-24'>
      <div className='z-10 max-w-5xl font-mono'>{renderComponent(page)}</div>
    </main>
  );
}
