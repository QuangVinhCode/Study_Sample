import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import ContentHeader from "../common/ContentHeader";
class Contact extends Component {
  render() {
    const { navigate } = this.props.router;
    return (
      <>
        <ContentHeader
          navigate={navigate}
          title="Liên hệ"
          className="site-page-header"
        ></ContentHeader>
        <div
          className="site-card-wrapper"
          style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
        >
          <h1>Lê Quang Vinh</h1>
          <h1>Ngô Duy Tấn</h1>
        </div>
      </>
    );
  }
}

export default withRouter(Contact);
