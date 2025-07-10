import React from 'react';
import Image from 'next/image';

export const revalidate = 300;

export const metadata = {
  title: 'Dashboard | iSMAIL',
};

export default async function Page() {
  return (
    <>
      <div className="hero">
        <div className="d-flex align-items-center justify-content-center">
          <div>
            <h1 className="f-style-italic my-0 fs-5">
              iSMAIL
            </h1>
            <p className="my-0">eMail Management</p>
          </div>
        </div>
        <div className="d-flex justify-content-center"></div>
      </div>
      <div className="dashboard-cards-container mt-5"></div>
    </>
  );
}

