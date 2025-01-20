import React, { useState } from "react";
import { Table, Tag, Typography, Button, Layout } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Content } = Layout;

// Mock 数据
const mockDataLintfix = [
  {
    key: "1",
    modelName: "ep-20241224180227-mx8vv",
    isFinetuned: "yes",
    baseModel: "doubao-0828",
    evaluationTime: "2025-01-20T16:10:37+08:00",
    datasetSize: 30,
    ast_em_rate: 0.16586935360481264,
    avg_similarity: 0.888610906,
    fix_rate_llm_eval: 0.5,
    responseTime: 0.6738332351048787,
    tokensPerSecond: 262.27552058456022,
  },
  {
    key: "2",
    modelName: "ep-20241224180227-mx8vv-v2",
    isFinetuned: "yes",
    baseModel: "doubao-0828",
    evaluationTime: "2025-01-20T17:15:37+08:00",
    datasetSize: 50,
    ast_em_rate: 0.18586935360481264,
    avg_similarity: 0.898610906,
    fix_rate_llm_eval: 0.55,
    responseTime: 0.5738332351048787,
    tokensPerSecond: 282.27552058456022,
  },
  {
    key: "3",
    modelName: "ep-20241224180227-mx8vv-v3",
    isFinetuned: "no",
    baseModel: "doubao-0828",
    evaluationTime: "2025-01-20T18:20:37+08:00",
    datasetSize: 40,
    ast_em_rate: 0.14586935360481264,
    avg_similarity: 0.858610906,
    fix_rate_llm_eval: 0.45,
    responseTime: 0.7738332351048787,
    tokensPerSecond: 242.27552058456022,
  },
];

const mockDataCode2Text = [
  {
    key: "1",
    modelName: "code2text-20240120-v1",
    isFinetuned: "yes",
    baseModel: "gpt-3.5",
    evaluationTime: "2024-01-20T14:30:00+08:00",
    datasetSize: 100,
    bleu_score: 0.42,
    responseTime: 0.8532,
    tokensPerSecond: 180.45,
  },
  {
    key: "2",
    modelName: "code2text-20240120-v2",
    isFinetuned: "yes",
    baseModel: "gpt-4",
    evaluationTime: "2024-01-20T15:45:00+08:00",
    datasetSize: 150,
    bleu_score: 0.45,
    responseTime: 0.7532,
    tokensPerSecond: 195.45,
  },
  {
    key: "3",
    modelName: "code2text-20240120-v3",
    isFinetuned: "no",
    baseModel: "gpt-3.5",
    evaluationTime: "2024-01-20T16:30:00+08:00",
    datasetSize: 80,
    bleu_score: 0.38,
    responseTime: 0.9532,
    tokensPerSecond: 165.45,
  },
];

const ScenarioEvaluation = () => {
  const [baselineKeyLintfix, setBaselineKeyLintfix] = useState(null);
  const [baselineKeyCode2Text, setBaselineKeyCode2Text] = useState(null);
  const [activeTab, setActiveTab] = useState("code2text"); // 默认显示 Code2Text

  // 渲染比较值
  const renderComparisonValue = (
    value,
    baselineValue,
    higherIsBetter = true,
    format = (v) => v.toFixed(4),
    isBaselineRow = false
  ) => {
    if (isBaselineRow) return <span>{format(value)}</span>;

    if (!baselineValue) return <span>{format(value)}</span>;

    const diff = value - baselineValue;
    if (Math.abs(diff) < 0.000001) {
      return <span style={{ color: "#999999" }}>{format(value)}</span>;
    }

    const isHigher = diff > 0;
    const color = isHigher
      ? higherIsBetter
        ? "#52c41a"
        : "#f5222d"
      : higherIsBetter
      ? "#f5222d"
      : "#52c41a";

    return (
      <span style={{ color }}>
        {format(value)}
        {isHigher ? (
          <ArrowUpOutlined style={{ marginLeft: 8 }} />
        ) : (
          <ArrowDownOutlined style={{ marginLeft: 8 }} />
        )}
      </span>
    );
  };

  // LintFix 场景的列
  const getLintFixColumns = () => [
    {
      title: "模型名称",
      dataIndex: "modelName",
      key: "modelName",
      sorter: (a, b) => a.modelName.localeCompare(b.modelName),
    },
    {
      title: "是否经过训练",
      dataIndex: "isFinetuned",
      key: "isFinetuned",
      filters: [
        { text: "是", value: "yes" },
        { text: "否", value: "no" },
      ],
      onFilter: (value, record) => record.isFinetuned === value,
      render: (value) => (
        <Tag color={value === "yes" ? "green" : "orange"}>
          {value === "yes" ? "是" : "否"}
        </Tag>
      ),
    },
    {
      title: "基础模型",
      dataIndex: "baseModel",
      key: "baseModel",
    },
    {
      title: "评测时间",
      dataIndex: "evaluationTime",
      key: "evaluationTime",
      sorter: (a, b) => new Date(a.evaluationTime) - new Date(b.evaluationTime),
    },
    {
      title: "数据集规模",
      dataIndex: "datasetSize",
      key: "datasetSize",
      sorter: (a, b) => a.datasetSize - b.datasetSize,
    },
    {
      title: "AST EM Rate",
      dataIndex: "ast_em_rate",
      key: "ast_em_rate",
      sorter: (a, b) => a.ast_em_rate - b.ast_em_rate,
      render: (value, record) =>
        renderComparisonValue(
          value,
          baselineKeyLintfix
            ? mockDataLintfix.find((d) => d.key === baselineKeyLintfix)
                ?.ast_em_rate
            : null,
          true,
          (v) => v.toFixed(4),
          record.key === baselineKeyLintfix
        ),
    },
    {
      title: "平均相似度",
      dataIndex: "avg_similarity",
      key: "avg_similarity",
      sorter: (a, b) => a.avg_similarity - b.avg_similarity,
      render: (value, record) =>
        renderComparisonValue(
          value,
          baselineKeyLintfix
            ? mockDataLintfix.find((d) => d.key === baselineKeyLintfix)
                ?.avg_similarity
            : null,
          true,
          (v) => v.toFixed(4),
          record.key === baselineKeyLintfix
        ),
    },
    {
      title: "Fix Rate",
      dataIndex: "fix_rate_llm_eval",
      key: "fix_rate_llm_eval",
      sorter: (a, b) => a.fix_rate_llm_eval - b.fix_rate_llm_eval,
      render: (value, record) =>
        renderComparisonValue(
          value,
          baselineKeyLintfix
            ? mockDataLintfix.find((d) => d.key === baselineKeyLintfix)
                ?.fix_rate_llm_eval
            : null,
          true,
          (v) => v.toFixed(4),
          record.key === baselineKeyLintfix
        ),
    },
    {
      title: "平均响应时间",
      dataIndex: "responseTime",
      key: "responseTime",
      sorter: (a, b) => a.responseTime - b.responseTime,
      render: (value, record) =>
        renderComparisonValue(
          value,
          baselineKeyLintfix
            ? mockDataLintfix.find((d) => d.key === baselineKeyLintfix)
                ?.responseTime
            : null,
          false,
          (v) => `${v.toFixed(4)}s`,
          record.key === baselineKeyLintfix
        ),
    },
    {
      title: "每秒处理 Token 数",
      dataIndex: "tokensPerSecond",
      key: "tokensPerSecond",
      sorter: (a, b) => a.tokensPerSecond - b.tokensPerSecond,
      render: (value, record) =>
        renderComparisonValue(
          value,
          baselineKeyLintfix
            ? mockDataLintfix.find((d) => d.key === baselineKeyLintfix)
                ?.tokensPerSecond
            : null,
          true,
          (v) => v.toFixed(2),
          record.key === baselineKeyLintfix
        ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Button
          type={record.key === baselineKeyLintfix ? "primary" : "default"}
          onClick={() =>
            setBaselineKeyLintfix(
              record.key === baselineKeyLintfix ? null : record.key
            )
          }
        >
          {record.key === baselineKeyLintfix ? "取消基线" : "设为基线"}
        </Button>
      ),
    },
  ];

  // Code2Text 场景的列
  const getCode2TextColumns = () => [
    {
      title: "模型名称",
      dataIndex: "modelName",
      key: "modelName",
      sorter: (a, b) => a.modelName.localeCompare(b.modelName),
    },
    {
      title: "是否经过训练",
      dataIndex: "isFinetuned",
      key: "isFinetuned",
      filters: [
        { text: "是", value: "yes" },
        { text: "否", value: "no" },
      ],
      onFilter: (value, record) => record.isFinetuned === value,
      render: (value) => (
        <Tag color={value === "yes" ? "green" : "orange"}>
          {value === "yes" ? "是" : "否"}
        </Tag>
      ),
    },
    {
      title: "基础模型",
      dataIndex: "baseModel",
      key: "baseModel",
    },
    {
      title: "评测时间",
      dataIndex: "evaluationTime",
      key: "evaluationTime",
      sorter: (a, b) => new Date(a.evaluationTime) - new Date(b.evaluationTime),
    },
    {
      title: "数据集规模",
      dataIndex: "datasetSize",
      key: "datasetSize",
      sorter: (a, b) => a.datasetSize - b.datasetSize,
    },
    {
      title: "平均响应时间",
      dataIndex: "responseTime",
      key: "responseTime",
      sorter: (a, b) => a.responseTime - b.responseTime,
      render: (value, record) =>
        renderComparisonValue(
          value,
          baselineKeyCode2Text
            ? mockDataCode2Text.find((d) => d.key === baselineKeyCode2Text)
                ?.responseTime
            : null,
          false,
          (v) => `${v.toFixed(4)}s`,
          record.key === baselineKeyCode2Text
        ),
    },
    {
      title: "BLEU分数",
      dataIndex: "bleu_score",
      key: "bleu_score",
      sorter: (a, b) => a.bleu_score - b.bleu_score,
      render: (value, record) =>
        renderComparisonValue(
          value,
          baselineKeyCode2Text
            ? mockDataCode2Text.find((d) => d.key === baselineKeyCode2Text)
                ?.bleu_score
            : null,
          true,
          (v) => v.toFixed(4),
          record.key === baselineKeyCode2Text
        ),
    },
    {
      title: "每秒处理 Token 数",
      dataIndex: "tokensPerSecond",
      key: "tokensPerSecond",
      sorter: (a, b) => a.tokensPerSecond - b.tokensPerSecond,
      render: (value, record) =>
        renderComparisonValue(
          value,
          baselineKeyCode2Text
            ? mockDataCode2Text.find((d) => d.key === baselineKeyCode2Text)
                ?.tokensPerSecond
            : null,
          true,
          (v) => v.toFixed(2),
          record.key === baselineKeyCode2Text
        ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Button
          type={record.key === baselineKeyCode2Text ? "primary" : "default"}
          onClick={() =>
            setBaselineKeyCode2Text(
              record.key === baselineKeyCode2Text ? null : record.key
            )
          }
        >
          {record.key === baselineKeyCode2Text ? "取消基线" : "设为基线"}
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", padding: "24px" }}>
      <Content>
        {/* 切换按钮 */}
        <div style={{ marginBottom: "24px" }}>
          <Button
            type={activeTab === "code2text" ? "primary" : "default"}
            onClick={() => setActiveTab("code2text")}
            style={{ marginRight: "16px" }}
          >
            代码生成
          </Button>
          <Button
            type={activeTab === "lintfix" ? "primary" : "default"}
            onClick={() => setActiveTab("lintfix")}
          >
            代码修复
          </Button>
        </div>

        {/* 表格内容 */}
        {activeTab === "code2text" ? (
          <>
            <Title level={2} style={{ marginBottom: "24px" }}>
              Code2Text 场景评测榜单
            </Title>
            <Table
              dataSource={mockDataCode2Text}
              columns={getCode2TextColumns()}
              pagination={false}
              bordered
              scroll={{ x: true }} // 自适应宽度
            />
          </>
        ) : (
          <>
            <Title level={2} style={{ marginBottom: "24px" }}>
              LintFix 场景评测榜单
            </Title>
            <Table
              dataSource={mockDataLintfix}
              columns={getLintFixColumns()}
              pagination={false}
              bordered
              scroll={{ x: true }} // 自适应宽度
            />
          </>
        )}
      </Content>
    </Layout>
  );
};

export default ScenarioEvaluation;
