import React from "react";
import { Table } from "antd";

const Leaderboard = () => {
  // Mock 数据
  const dataSource = [
    {
      key: "1",
      rank: 1,
      name: "用户A",
      score: 95,
    },
    {
      key: "2",
      rank: 2,
      name: "用户B",
      score: 90,
    },
    {
      key: "3",
      rank: 3,
      name: "用户C",
      score: 85,
    },
    {
      key: "4",
      rank: 4,
      name: "用户D",
      score: 80,
    },
    {
      key: "5",
      rank: 5,
      name: "用户E",
      score: 75,
    },
  ];

  const columns = [
    {
      title: "排名",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "用户名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "分数",
      dataIndex: "score",
      key: "score",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2>排行榜</h2>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default Leaderboard; // 确保使用 export default
