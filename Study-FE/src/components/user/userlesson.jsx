import { Avatar, Card, Skeleton } from "antd";
import React, { Component } from "react";
import Monhoc from "../../Monhoc.png";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import { getLessonsBySubject } from "../../redux/actions/lessonAction";
import ContentHeader from "../common/ContentHeader";
import {
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
class userlesson extends Component {
  componentDidMount = () => {
    this.props.getLessonsBySubject(this.props.router.params.id);
    console.log("Did Mount");
  };

  componentWillUnmount = () => {
    console.log("Will Unmount");
  };
  onDetails = (id) => {
    const { navigate } = this.props.router;
    navigate("/user/lessondetails/" + id);
  };

  render() {
    const { navigate } = this.props.router;
    const { lessons, isLoading } = this.props;
    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Danh sách bài học"
            className="site-page-header"
          ></ContentHeader>
          <Skeleton active />
        </>
      );
    }
    return (
      <>
        <ContentHeader
          navigate={navigate}
          title="Danh sách bài học"
          className="site-page-header"
        ></ContentHeader>
        <div
          className="site-card-wrapper"
          style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
        >
          {lessons.length === 0 ? "Không có bài học" : (lessons.map((item) => (
            <Card
              key={item.id}
              style={{ width: 300 }}
              cover={<img alt="example" src={Monhoc} />}
              onClick={() => this.onDetails(item.id)}
            >
              <Meta title={item.lessonname} />
            </Card>
          )))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  lessons: state.lessonReducer.lessons,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getLessonsBySubject,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(userlesson)
);
