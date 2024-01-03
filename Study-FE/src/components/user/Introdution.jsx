import React, { Component } from "react";
import withRouter from "../../helpers/withRouter";
import ContentHeader from "../common/ContentHeader";
class Introdution extends Component {
  render() {
    const { navigate } = this.props.router;
    return (
      <>
        <ContentHeader
          navigate={navigate}
          title="Giới thiệu"
          className="site-page-header"
        ></ContentHeader>
        <div
          className="site-card-wrapper"
          style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
        >
          <p>
            Web học tập trực tuyến đang trở thành một phần quan trọng của cuộc
            sống hiện đại, mở ra những cơ hội học vô song cho mọi người trên
            khắp thế giới. Được xây dựng trên nền tảng công nghệ, web học tập
            trực tuyến không chỉ mang lại sự tiện lợi mà còn làm thay đổi cách
            chúng ta tiếp cận kiến thức.
          </p>
        </div>
      </>
    );
  }
}

export default withRouter(Introdution);
