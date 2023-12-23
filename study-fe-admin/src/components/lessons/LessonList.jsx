import React, { Component } from "react";
import { Button, Space, Table } from "antd";
import Column from "antd/lib/table/Column";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

class LessonList extends Component {
  render() {
    const { dataSource, onEdit, onDetails, onDeleteConfirm } = this.props;
    return (
      <>
        <Table dataSource={dataSource} size="small" rowKey="id">
          <Column
            title="Mã bài học"
            key="id"
            dataIndex="id"
            width={40}
            align="center"
          ></Column>
          <Column
            title="Tên bài học"
            key="lessonname"
            dataIndex="lessonname"
            width={80}
            align="center"
          ></Column>
          <Column
            title="Môn học"
            key="subject"
            dataIndex="subject"
            width={80}
            align="center"
            render={(subject) =>
              subject
                ? (subject.subjecttitle)
                : "N/A"
            }
          ></Column>
          <Column
            title="Tác vụ"
            key="action"
            dataIndex="action"
            width={140}
            align="center"
            render={(_, record) => (
              <Space size="middle">
                <Button
                  key={record.key}
                  type="primary"
                  size="small"
                  onClick={() => onDetails(record)}
                >
                  <EyeOutlined style={{ marginRight: 8 }} />
                  Xem
                </Button>
                <Button
                  key={record.key}
                  type="primary"
                  size="small"
                  onClick={() => onEdit(record)}
                >
                  <EditOutlined style={{ marginRight: 8 }} />
                  Sửa
                </Button>
                <Button
                  key={record.key}
                  type="primary"
                  danger
                  size="small"
                  onClick={() => onDeleteConfirm(record)}
                >
                  <DeleteOutlined style={{ marginRight: 8 }} />
                  Xóa
                </Button>
              </Space>
            )}
          ></Column>
        </Table>
      </>
    );
  }
}

export default LessonList;