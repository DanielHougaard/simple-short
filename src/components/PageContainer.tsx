import { Form } from 'formik';
import React from 'react';

export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-slate-950 text-white w-full justify-between flex flex-col items-center font-inter">
      <Form className="min-h-screen h-screen">
        {children}
      </Form>
    </main>
  );
}
