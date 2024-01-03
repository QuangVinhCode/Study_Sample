import { Avatar, Card, Skeleton } from "antd";
import React, { Component } from "react";
import Lophoc from "../../Lophoc.png";
import { connect } from "react-redux";
import withRouter from "../../helpers/withRouter";
import { getClasses,clearClassState } from "../../redux/actions/classAction";
import ContentHeader from "../common/ContentHeader";
const { Meta } = Card;
class userclass extends Component {
  componentDidMount = () => {
    this.props.getClasses();
    console.log("Did Mount");
  };

  componentWillUnmount = () => {
    this.props.clearClassState();
    console.log("Will Unmount");
  };
  onSubjects = (id) => {
    const { navigate } = this.props.router;
    navigate("/user/subject/" + id);
  }
  render() {
    const { navigate } = this.props.router;
    const { objects, isLoading } = this.props;
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
          title="Danh sách lớp học"
          className="site-page-header"
        ></ContentHeader>
        <div
          className="site-card-wrapper"
          style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}
        >
          {objects.map((item) => (
            <Card
              key={item.id}
              style={{ width: 300 }}
              cover={<img alt="example" src={Lophoc} />}
              onClick={() => this.onSubjects(item.id)}
            >
              <Meta title={item.classname} />
              
            </Card>
          ))}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  objects: state.classReducer.objects,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getClasses,
  clearClassState,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(userclass)
);
