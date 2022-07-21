import React from "react";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { page, pageHandler, nbPages, loading } = useGlobalContext();
  return (
    <section className="btn-container">
      <button disabled={loading} onClick={() => pageHandler("prev")}>
        Prev
      </button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <button disabled={loading} onClick={() => pageHandler("next")}>
        Next
      </button>
    </section>
  );
};

export default Buttons;
