import React from "react";
import "./index.css";
import {
  TrophyOutlined,
  ExperimentOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Leaderboard from "./leaderboard"; // 默认导入
import ScenarioEvaluation from "./scenarioEvaluation"; // 默认导入
import About from "./about"; // 默认导入

const { Header, Content, Sider } = Layout;

const items2 = [
  {
    key: "1",
    icon: React.createElement(TrophyOutlined),
    label: <Link to="/leaderboard">排行榜</Link>,
  },
  {
    key: "2",
    icon: React.createElement(ExperimentOutlined),
    label: "场景评测",
    children: [
      {
        key: "2-1",
        label: <Link to="/scenario/code2text">代码生成</Link>,
      },
      {
        key: "2-2",
        label: <Link to="/scenario/lint_fix">代码修复</Link>,
      },
    ],
  },
  {
    key: "3",
    icon: React.createElement(InfoCircleOutlined),
    label: <Link to="/about">关于我们</Link>,
  },
];

const App = () => {
  return (
    <Router>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            background: "#fff",
            padding: "0 24px",
          }}
        >
          <div className="demo-logo" />
          <h1 style={{ color: "rgba(0, 0, 0, 0.88)", margin: 0 }}>
            Codal Insight
          </h1>
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <Layout style={{ padding: "24px 0", background: "#fff" }}>
            <Sider width={200} style={{ background: "#fff" }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
                items={items2}
              />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Routes>
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route
                  path="/scenario/code2text"
                  element={<ScenarioEvaluation />}
                />
                <Route
                  path="/scenario/lint_fix"
                  element={<ScenarioEvaluation />}
                />
                <Route path="/about" element={<About />} />
              </Routes>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
