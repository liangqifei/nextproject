import React from "react";

import stylesheet from "../styles/index.scss";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "1"
    };
  }
  componentWillMount() {}
  render() {
    return (
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: stylesheet
          }}
        />
        Appss
        <img src="/static/imgs/logo.png" />
      </div>
    );
  }
}
