import React from "react";
import AA from "../components/a.js";
import stylesheet from "../styles/index3.scss";
export default class App2 extends React.Component {
  render() {
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: stylesheet
          }}
        />
        <AA />
        App2222
        <img src="/static/imgs/logo.png" />
      </div>
    );
  }
}
