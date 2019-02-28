import React from "react";

import stylesheet from "../styles/index.scss";
export default class App extends React.Component {
  render() {
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: stylesheet
          }}
        />
        App
        <img src="/static/imgs/logo.png" />
      </div>
    );
  }
}
