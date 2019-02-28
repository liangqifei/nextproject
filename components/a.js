import React from "react";

import stylesheet from "../styles/aa.scss";
export default class AA extends React.Component {
  render() {
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: stylesheet
          }}
        />
        AAComponent
      </div>
    );
  }
}
