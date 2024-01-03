import { Avatar, Card, Skeleton } from "antd";
import React, { Component } from "react";
import Monhoc from "../../Monhoc.png";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import {
  getSubjectsByClass,
  clearSubjectState,
} from "../../redux/actions/subjectAction";
import ContentHeader from "../common/ContentHeader";
const { Meta } = Card;
class usersubject extends Component {
  componentDidMount = () => {
    this.props.getSubjectsByClass(this.props.router.params.id);

    console.log("Did Mount");
  };

  componentWillUnmount = () => {
    this.props.clearSubjectState();
    console.log("Will Unmount");
  };
  onLessons = (id) => {
    const { navigate } = this.props.router;
    navigate("/user/lesson/" + id);
  };
  render() {
    const { navigate } = this.props.router;
    const { subjects, isLoading } = this.props;
    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Danh sách lớp học"
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
          title="Danh sách môn học"
          className="site-page-header"
        ></ContentHeader>
        <div
          className="site-card-wrapper"
          style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
        >
          {subjects.length===0 ? "Không có môn học" : (subjects.map((item) => (
            <Card
              key={item.id}
              style={{ width: 300 }}
              cover={<img alt="example" src={Monhoc} />}
              onClick={() => this.onLessons(item.id)}
            >
              <Meta title={item.subjecttitle} />
              {item.classInfo.classname}
            </Card>
          )))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  subjects: state.subjectReducer.subjects,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getSubjectsByClass,
  clearSubjectState,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(usersubject)
);
