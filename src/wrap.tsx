import root from "react-shadow";
import { jssPreset, StylesProvider } from "@material-ui/styles";
import { create } from "jss";
import React, { useState } from "react";
const WrappedJssComponent = ({ children }) => {
  const [jss, setJss] = useState(null);
  function setRefAndCreateJss(headRef) {
    if (headRef && !jss) {
      const createdJssWithRef = create({
        ...jssPreset(),
        insertionPoint: headRef
      });
      setJss(createdJssWithRef);
    }
  }
  return (
    <root.div id="shadow-portal">
      <head>
        <style ref={setRefAndCreateJss} />
      </head>
      {jss && <StylesProvider jss={jss}>{children}</StylesProvider>}
    </root.div>
  );
};
export default WrappedJssComponent;
