import * as React from 'react';
import Navbar from '../common/navbar/navbar';
import PageTitle from './pageTitle';

export default function ErrorPage() {

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "5rem" }}>
        <div className="container" style={{ minHeight: "30rem" }}>
          <PageTitle title="Error Page"></PageTitle>
        </div>
      </div>


    </div>
  );
}