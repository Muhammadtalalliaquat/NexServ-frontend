"use client";

import withAdminCheck from "../../HOC/withAuth";

function AddService() {
  return (
    <>
      <h1>Add Sefvide admin</h1>
    </>
  );
}

export default withAdminCheck(AddService);
