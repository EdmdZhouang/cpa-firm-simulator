---
id: curated-cpa-firm-simulator-content-pack
title: CPA事务所模拟器 - 内容包 v1.0
domain: agent_project
input_type: conversation
content_type: project
record_mode: working
source_kind: llm_design
source_reliability: low
novelty: medium
reusability: medium
actionability: medium
entities:
  - CPA事务所模拟器
concepts:
  - 示例内容
  - CPA题库
  - 案件设计
date_of_source: 2026-05-19
ingested_at: 2026-05-19
horizon: short
valid_until: 2026-08-31
expiry_trigger: CPA考试结束
review_cycle: weekly
review_trigger: 内容更新或纠错
status: active
primary_record_targets:
  - 20-Curated/Agent项目/CPA事务所模拟器
outcome: 首批示例内容完成
next_time_rule: 开发测试用，后续替换为权威内容
created_by: Hermes Agent
last_reviewed: 2026-05-19
---

# 内容包 v1.0

> **⚠️ 免责声明**：所有题目和案件均为**示例内容**，仅供学习参考，不构成权威CPA题库。真实备考请以官方教材和权威题库为准。

## 统计

- 题目：15道（会计5 / 税法4 / 经济法6）
- 案件：10个（会计3 / 税法3 / 经济法4）
- 状态：全部标记 `isSampleContent: true`

## JSON数据

```json
{
  "version": "1.0.0-mvp",
  "disclaimer": "本内容包所有题目和案件均为示例内容，仅供学习参考，不构成权威CPA题库。",
  "questions": [
    {
      "id": "acc-rev-001",
      "subject": "会计",
      "topic": "收入确认",
      "difficulty": 1,
      "scenario": "客户A公司签订销售合同，约定货物交付后30天付款，但客户在交付当天即取得控制权。",
      "question": "A公司应在何时确认收入？",
      "options": [
        "签订合同时",
        "货物交付时",
        "收到货款时",
        "30天付款期满时"
      ],
      "answer": 1,
      "explanation": "根据收入准则，当客户取得控制权时确认收入。本题中交付当天客户即取得控制权，应在交付时确认。",
      "tags": [
        "收入确认",
        "控制权转移"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-acc-rev-001"
      ]
    },
    {
      "id": "acc-rev-002",
      "subject": "会计",
      "topic": "收入确认",
      "difficulty": 2,
      "scenario": "B公司签订2年服务合同，总金额为120万元，服务在2年内均匀提供。",
      "question": "第一年末B公司应确认多少收入？",
      "options": [
        "0元",
        "60万元",
        "120万元",
        "30万元"
      ],
      "answer": 1,
      "explanation": "服务在2年内均匀提供，应按时间进度确认收入。第一年末应确认120万÷2=60万元。",
      "tags": [
        "收入确认",
        "履约义务",
        "时间段"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-acc-rev-001"
      ]
    },
    {
      "id": "acc-lti-001",
      "subject": "会计",
      "topic": "长期股权投资",
      "difficulty": 2,
      "scenario": "客户持有C公司35%股权，并派驻1名董事参与C公司经营决策。",
      "question": "该长期股权投资应采用哪种后续计量方法？",
      "options": [
        "成本法",
        "权益法",
        "公允价值计量",
        "摊余成本计量"
      ],
      "answer": 1,
      "explanation": "派驻董事通常表明具有重大影响（20%-50%股权），应采用权益法核算。",
      "tags": [
        "长投",
        "重大影响",
        "权益法"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-acc-lti-001"
      ]
    },
    {
      "id": "acc-lti-002",
      "subject": "会计",
      "topic": "长期股权投资",
      "difficulty": 3,
      "scenario": "客户持有D公司60%股权，能够控制D公司的财务和经营决策。",
      "question": "该长期股权投资应采用哪种后续计量方法？",
      "options": [
        "成本法",
        "权益法",
        "公允价值计量",
        "摊余成本计量"
      ],
      "answer": 0,
      "explanation": "持股超过50%且能够控制被投资单位，应采用成本法核算。",
      "tags": [
        "长投",
        "控制",
        "成本法"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-acc-lti-001"
      ]
    },
    {
      "id": "acc-con-001",
      "subject": "会计",
      "topic": "合并报表",
      "difficulty": 3,
      "scenario": "母公司向子公司销售商品100万元，毛利率20%。期末子公司尚未对外销售该商品。",
      "question": "编制合并报表时，应抵销的未实现内部销售利润为多少？",
      "options": [
        "0元",
        "20万元",
        "100万元",
        "80万元"
      ],
      "answer": 1,
      "explanation": "未实现内部销售利润=100万×20%=20万元。合并时应抵销这部分未实现利润。",
      "tags": [
        "合并报表",
        "内部交易",
        "未实现利润"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-acc-con-001"
      ]
    },
    {
      "id": "tax-vat-001",
      "subject": "税法",
      "topic": "增值税",
      "difficulty": 1,
      "scenario": "某一般纳税人销售货物，不含税销售额为100万元，适用增值税税率13%。",
      "question": "该笔销售应确认的销项税额为多少？",
      "options": [
        "13万元",
        "11.5万元",
        "10万元",
        "8.85万元"
      ],
      "answer": 0,
      "explanation": "销项税额=不含税销售额×税率=100万×13%=13万元。",
      "tags": [
        "增值税",
        "销项税额"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-tax-vat-001"
      ]
    },
    {
      "id": "tax-vat-002",
      "subject": "税法",
      "topic": "增值税",
      "difficulty": 2,
      "scenario": "某企业购进原材料取得增值税专用发票，注明价款50万元，税额6.5万元。当月销售货物产生销项税额10万元。",
      "question": "当月应缴纳的增值税为多少？",
      "options": [
        "10万元",
        "16.5万元",
        "3.5万元",
        "6.5万元"
      ],
      "answer": 2,
      "explanation": "应纳税额=销项税额-进项税额=10万-6.5万=3.5万元。",
      "tags": [
        "增值税",
        "进项税额",
        "应纳税额"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-tax-vat-001"
      ]
    },
    {
      "id": "tax-cit-001",
      "subject": "税法",
      "topic": "企业所得税",
      "difficulty": 2,
      "scenario": "某企业年度会计利润为200万元，其中包含国债利息收入10万元（免税），税收滞纳金5万元（不得扣除）。",
      "question": "该企业应纳税所得额是多少？",
      "options": [
        "200万元",
        "195万元",
        "205万元",
        "185万元"
      ],
      "answer": 1,
      "explanation": "应纳税所得额=200-10（免税收入调减）+5（不得扣除调增）=195万元。",
      "tags": [
        "企业所得税",
        "应纳税所得额",
        "纳税调整"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-tax-cit-001"
      ]
    },
    {
      "id": "tax-cit-002",
      "subject": "税法",
      "topic": "企业所得税",
      "difficulty": 3,
      "scenario": "某高新技术企业，年度应纳税所得额为300万元。",
      "question": "该企业应缴纳的企业所得税为多少？（高新技术企业税率15%）",
      "options": [
        "75万元",
        "45万元",
        "60万元",
        "90万元"
      ],
      "answer": 1,
      "explanation": "应纳税额=300万×15%=45万元。高新技术企业适用15%优惠税率。",
      "tags": [
        "企业所得税",
        "优惠税率",
        "高新技术企业"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-tax-cit-001"
      ]
    },
    {
      "id": "law-cor-001",
      "subject": "经济法",
      "topic": "公司法",
      "difficulty": 1,
      "scenario": "某有限责任公司注册资本100万元，股东甲认缴60万元，已实缴20万元；股东乙认缴40万元，已实缴40万元。",
      "question": "股东甲未缴足的出资额为多少？",
      "options": [
        "60万元",
        "40万元",
        "20万元",
        "80万元"
      ],
      "answer": 1,
      "explanation": "未缴足出资=认缴60万-已实缴20万=40万元。",
      "tags": [
        "公司法",
        "出资",
        "认缴"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-law-cor-001"
      ]
    },
    {
      "id": "law-cor-002",
      "subject": "经济法",
      "topic": "公司法",
      "difficulty": 2,
      "scenario": "某有限公司股东会拟作出变更公司形式的决议。",
      "question": "该决议应经代表多少表决权的股东通过？",
      "options": [
        "过半数",
        "三分之二以上",
        "全体一致",
        "四分之三以上"
      ],
      "answer": 1,
      "explanation": "变更公司形式属于特别决议事项，应经代表三分之二以上表决权的股东通过。",
      "tags": [
        "公司法",
        "股东会",
        "特别决议"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-law-cor-001"
      ]
    },
    {
      "id": "law-con-001",
      "subject": "经济法",
      "topic": "合同法",
      "difficulty": 2,
      "scenario": "甲向乙发出要约，规定承诺期限为10天。乙在第12天才发出承诺通知。",
      "question": "该承诺的效力如何？",
      "options": [
        "有效",
        "无效",
        "要约人可决定是否接受",
        "自动生效"
      ],
      "answer": 2,
      "explanation": "超过承诺期限发出承诺，视为新要约，原要约人（甲）可决定是否接受。",
      "tags": [
        "合同法",
        "要约",
        "承诺",
        "期限"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-law-con-001"
      ]
    },
    {
      "id": "law-neg-001",
      "subject": "经济法",
      "topic": "票据法",
      "difficulty": 2,
      "scenario": "甲签发一张金额为50万元的商业汇票给乙，乙背书转让给丙，丙背书转让给丁。丁向付款人提示付款被拒绝。",
      "question": "丁可以向谁行使追索权？",
      "options": [
        "只能向甲",
        "只能向丙",
        "可以向甲、乙、丙中的任何一人",
        "只能向乙"
      ],
      "answer": 2,
      "explanation": "汇票的出票人、背书人对持票人承担连带责任，持票人可以对其中任何一人行使追索权。",
      "tags": [
        "票据法",
        "追索权",
        "背书",
        "连带责任"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-law-neg-001"
      ]
    },
    {
      "id": "law-neg-002",
      "subject": "经济法",
      "topic": "票据法",
      "difficulty": 3,
      "scenario": "某汇票记载付款日期为\"见票后3个月\"，但未记载出票日期。",
      "question": "该汇票效力如何？",
      "options": [
        "有效",
        "无效",
        "效力待定",
        "可补记"
      ],
      "answer": 1,
      "explanation": "出票日期为汇票的绝对必要记载事项，未记载则汇票无效。",
      "tags": [
        "票据法",
        "必要记载事项",
        "出票日期"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-law-neg-001"
      ]
    },
    {
      "id": "law-bkr-001",
      "subject": "经济法",
      "topic": "破产法",
      "difficulty": 3,
      "scenario": "某企业被法院受理破产申请后，管理人对破产申请受理前成立而债务人和对方当事人均未履行完毕的合同。",
      "question": "管理人应如何处理该合同？",
      "options": [
        "必须继续履行",
        "必须解除",
        "有权决定解除或继续履行",
        "由债权人会议决定"
      ],
      "answer": 2,
      "explanation": "管理人对破产申请受理前成立而双方均未履行完毕的合同，有权决定解除或继续履行。",
      "tags": [
        "破产法",
        "管理人",
        "待履行合同"
      ],
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "relatedCases": [
        "case-law-bkr-001"
      ]
    }
  ],
  "cases": [
    {
      "id": "case-acc-rev-001",
      "title": "上市辅导前的收入确认审查",
      "subject": "会计",
      "topics": [
        "收入确认",
        "控制权转移"
      ],
      "difficulty": 1,
      "deadlineTurns": 3,
      "description": "客户即将IPO，保荐机构发现其收入确认时点存在争议。部分销售合同约定\"验收合格后付款\"，但公司在发货时即确认收入。",
      "enemy": "收入提前确认 + 保荐机构质疑",
      "requiredSkill": {
        "accounting": 5
      },
      "questions": [
        "acc-rev-001",
        "acc-rev-002"
      ],
      "targetCorrectRate": 80,
      "minQuestions": 2,
      "reward": {
        "cash": 2000,
        "reputation": 3,
        "skill": {
          "accounting": 2
        },
        "unlockCases": [
          "case-acc-lti-001"
        ]
      },
      "riskOnFail": 5,
      "failureConsequences": {
        "cashLoss": 1000,
        "reputationLoss": 2,
        "riskGain": 5,
        "generateVulnerability": true
      },
      "allowEquityReward": false,
      "independenceSensitive": true,
      "victoryConditions": [
        {
          "type": "minQuestions",
          "target": 2,
          "description": "完成至少2道题"
        },
        {
          "type": "correctRate",
          "target": 80,
          "description": "正确率达到80%"
        }
      ],
      "actionsAvailable": [
        {
          "id": "study",
          "name": "学习专项",
          "energyCost": 15,
          "effect": "下一题命中率+15%"
        },
        {
          "id": "question",
          "name": "做题攻关",
          "energyCost": 10,
          "effect": "答对推进进度+5%"
        },
        {
          "id": "expert",
          "name": "请专家复核",
          "energyCost": 5,
          "cashCost": 1000,
          "effect": "风险-15"
        },
        {
          "id": "qc",
          "name": "质量控制",
          "energyCost": 15,
          "effect": "本回合答错风险减半"
        }
      ],
      "initialStatus": "available",
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "stagePreview": null
    },
    {
      "id": "case-acc-lti-001",
      "title": "并购后的长期股权投资危机",
      "subject": "会计",
      "topics": [
        "长期股权投资",
        "权益法",
        "成本法"
      ],
      "difficulty": 2,
      "deadlineTurns": 5,
      "description": "客户完成股权收购后，报表团队无法判断后续计量方法。部分投资持股35%派驻董事，部分持股60%控制经营。",
      "enemy": "投资分类错误 + 后续计量混乱",
      "requiredSkill": {
        "accounting": 15
      },
      "questions": [
        "acc-lti-001",
        "acc-lti-002"
      ],
      "targetCorrectRate": 80,
      "minQuestions": 2,
      "reward": {
        "cash": 8000,
        "reputation": 8,
        "skill": {
          "accounting": 5
        },
        "unlockCases": [
          "case-acc-con-001"
        ]
      },
      "riskOnFail": 12,
      "failureConsequences": {
        "cashLoss": 4000,
        "reputationLoss": 5,
        "riskGain": 12,
        "generateVulnerability": true,
        "clientLoss": true
      },
      "allowEquityReward": false,
      "independenceSensitive": true,
      "victoryConditions": [
        {
          "type": "minQuestions",
          "target": 2,
          "description": "完成至少2道题"
        },
        {
          "type": "correctRate",
          "target": 80,
          "description": "正确率达到80%"
        }
      ],
      "actionsAvailable": [
        {
          "id": "study",
          "name": "学习专项",
          "energyCost": 15,
          "effect": "下一题命中率+15%"
        },
        {
          "id": "question",
          "name": "做题攻关",
          "energyCost": 10,
          "effect": "答对推进进度+5%"
        },
        {
          "id": "expert",
          "name": "请专家复核",
          "energyCost": 5,
          "cashCost": 3000,
          "effect": "风险-15"
        },
        {
          "id": "qc",
          "name": "质量控制",
          "energyCost": 15,
          "effect": "本回合答错风险减半"
        }
      ],
      "initialStatus": "locked",
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "stagePreview": null
    },
    {
      "id": "case-acc-con-001",
      "title": "合并报表抵消失控",
      "subject": "会计",
      "topics": [
        "合并报表",
        "内部交易",
        "未实现利润"
      ],
      "difficulty": 3,
      "deadlineTurns": 5,
      "description": "客户编制合并报表时，内部交易抵销出现混乱。母子公司之间有大量未实现内部销售利润未抵销。",
      "enemy": "未实现利润累积 + 合并范围错误",
      "requiredSkill": {
        "accounting": 25
      },
      "questions": [
        "acc-con-001"
      ],
      "targetCorrectRate": 80,
      "minQuestions": 1,
      "reward": {
        "cash": 12000,
        "reputation": 12,
        "skill": {
          "accounting": 8
        },
        "unlockCases": []
      },
      "riskOnFail": 15,
      "failureConsequences": {
        "cashLoss": 6000,
        "reputationLoss": 8,
        "riskGain": 15,
        "generateVulnerability": true
      },
      "allowEquityReward": false,
      "independenceSensitive": true,
      "victoryConditions": [
        {
          "type": "minQuestions",
          "target": 1,
          "description": "完成至少1道题"
        },
        {
          "type": "correctRate",
          "target": 80,
          "description": "正确率达到80%"
        }
      ],
      "actionsAvailable": [
        {
          "id": "study",
          "name": "学习专项",
          "energyCost": 15,
          "effect": "下一题命中率+15%"
        },
        {
          "id": "question",
          "name": "做题攻关",
          "energyCost": 10,
          "effect": "答对推进进度+5%"
        },
        {
          "id": "expert",
          "name": "请专家复核",
          "energyCost": 5,
          "cashCost": 5000,
          "effect": "风险-15"
        },
        {
          "id": "qc",
          "name": "质量控制",
          "energyCost": 15,
          "effect": "本回合答错风险减半"
        }
      ],
      "initialStatus": "locked",
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "stagePreview": "三人小所解锁更多合并报表案件"
    },
    {
      "id": "case-tax-vat-001",
      "title": "发票链条异常警报",
      "subject": "税法",
      "topics": [
        "增值税",
        "进项税额",
        "发票风险"
      ],
      "difficulty": 1,
      "deadlineTurns": 3,
      "description": "客户的供应商被税务机关列为异常凭证，客户已抵扣的进项税额面临转出风险。",
      "enemy": "异常凭证 + 进项转出",
      "requiredSkill": {
        "tax": 5
      },
      "questions": [
        "tax-vat-001",
        "tax-vat-002"
      ],
      "targetCorrectRate": 80,
      "minQuestions": 2,
      "reward": {
        "cash": 2000,
        "reputation": 3,
        "skill": {
          "tax": 2
        },
        "unlockCases": [
          "case-tax-cit-001"
        ]
      },
      "riskOnFail": 5,
      "failureConsequences": {
        "cashLoss": 1000,
        "reputationLoss": 2,
        "riskGain": 5,
        "generateVulnerability": true
      },
      "allowEquityReward": false,
      "independenceSensitive": false,
      "victoryConditions": [
        {
          "type": "minQuestions",
          "target": 2,
          "description": "完成至少2道题"
        },
        {
          "type": "correctRate",
          "target": 80,
          "description": "正确率达到80%"
        }
      ],
      "actionsAvailable": [
        {
          "id": "study",
          "name": "学习专项",
          "energyCost": 15,
          "effect": "下一题命中率+15%"
        },
        {
          "id": "question",
          "name": "做题攻关",
          "energyCost": 10,
          "effect": "答对推进进度+5%"
        },
        {
          "id": "expert",
          "name": "请税务顾问",
          "energyCost": 5,
          "cashCost": 1000,
          "effect": "风险-15"
        },
        {
          "id": "qc",
          "name": "复核凭证",
          "energyCost": 15,
          "effect": "本回合答错风险减半"
        }
      ],
      "initialStatus": "available",
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "stagePreview": null
    },
    {
      "id": "case-tax-cit-001",
      "title": "企业所得税汇算清缴危机",
      "subject": "税法",
      "topics": [
        "企业所得税",
        "应纳税所得额",
        "纳税调整"
      ],
      "difficulty": 2,
      "deadlineTurns": 5,
      "description": "客户年度汇算清缴临近截止日，发现大量纳税调整事项未处理，可能面临补税和滞纳金。",
      "enemy": "纳税调整遗漏 + 滞纳金累积",
      "requiredSkill": {
        "tax": 15
      },
      "questions": [
        "tax-cit-001",
        "tax-cit-002"
      ],
      "targetCorrectRate": 80,
      "minQuestions": 2,
      "reward": {
        "cash": 8000,
        "reputation": 8,
        "skill": {
          "tax": 5
        },
        "unlockCases": [
          "case-tax-audit-001"
        ]
      },
      "riskOnFail": 12,
      "failureConsequences": {
        "cashLoss": 4000,
        "reputationLoss": 5,
        "riskGain": 12,
        "generateVulnerability": true
      },
      "allowEquityReward": false,
      "independenceSensitive": false,
      "victoryConditions": [
        {
          "type": "minQuestions",
          "target": 2,
          "description": "完成至少2道题"
        },
        {
          "type": "correctRate",
          "target": 80,
          "description": "正确率达到80%"
        }
      ],
      "actionsAvailable": [
        {
          "id": "study",
          "name": "学习专项",
          "energyCost": 15,
          "effect": "下一题命中率+15%"
        },
        {
          "id": "question",
          "name": "做题攻关",
          "energyCost": 10,
          "effect": "答对推进进度+5%"
        },
        {
          "id": "expert",
          "name": "请税务顾问",
          "energyCost": 5,
          "cashCost": 3000,
          "effect": "风险-15"
        },
        {
          "id": "qc",
          "name": "复核申报表",
          "energyCost": 15,
          "effect": "本回合答错风险减半"
        }
      ],
      "initialStatus": "locked",
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "stagePreview": "区域事务所解锁税务稽查案件"
    },
    {
      "id": "case-tax-audit-001",
      "title": "税务稽查应对",
      "subject": "税法",
      "topics": [
        "税务稽查",
        "增值税",
        "企业所得税",
        "风险识别"
      ],
      "difficulty": 3,
      "deadlineTurns": 4,
      "description": "客户收到税务机关风险提示，增值税抵扣链条和企业所得税纳税调整同时被关注。你需要快速复核关键税种，判断补税风险并准备应对材料。",
      "enemy": "稽查压力 + 跨税种风险",
      "requiredSkill": {
        "tax": 25
      },
      "questions": [
        "tax-vat-001",
        "tax-vat-002",
        "tax-cit-001",
        "tax-cit-002"
      ],
      "targetCorrectRate": 75,
      "minQuestions": 4,
      "reward": {
        "cash": 10000,
        "reputation": 9,
        "skill": {
          "tax": 6
        },
        "unlockCases": []
      },
      "riskOnFail": 15,
      "failureConsequences": {
        "cashLoss": 5000,
        "reputationLoss": 6,
        "riskGain": 15,
        "generateVulnerability": true,
        "delayTurns": 1
      },
      "allowEquityReward": false,
      "independenceSensitive": false,
      "victoryConditions": [
        {
          "type": "minQuestions",
          "target": 4,
          "description": "完成4道跨税种题"
        },
        {
          "type": "correctRate",
          "target": 75,
          "description": "正确率达到75%"
        }
      ],
      "actionsAvailable": [
        {
          "id": "study",
          "name": "学习专项",
          "energyCost": 15,
          "effect": "下一题命中率+15%"
        },
        {
          "id": "question",
          "name": "做题攻关",
          "energyCost": 10,
          "effect": "答对推进进度+5%"
        },
        {
          "id": "expert",
          "name": "请税务顾问",
          "energyCost": 5,
          "cashCost": 3000,
          "effect": "风险-15"
        },
        {
          "id": "qc",
          "name": "准备稽查底稿",
          "energyCost": 15,
          "effect": "本回合答错风险减半"
        }
      ],
      "initialStatus": "locked",
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "stagePreview": "区域事务所解锁更复杂的税务争议案件"
    },
    {
      "id": "case-law-cor-001",
      "title": "创始人股权争夺战",
      "subject": "经济法",
      "topics": [
        "公司法",
        "股权结构",
        "股东权利"
      ],
      "difficulty": 1,
      "deadlineTurns": 3,
      "description": "客户公司两位创始人因经营理念不合，就股权比例和公司控制权发生争议，需要你提供法律意见。",
      "enemy": "股权比例争议 + 控制权争夺",
      "requiredSkill": {
        "economicLaw": 5
      },
      "questions": [
        "law-cor-001",
        "law-cor-002"
      ],
      "targetCorrectRate": 80,
      "minQuestions": 2,
      "reward": {
        "cash": 2000,
        "reputation": 3,
        "skill": {
          "economicLaw": 2
        },
        "unlockCases": [
          "case-law-con-001"
        ]
      },
      "riskOnFail": 5,
      "failureConsequences": {
        "cashLoss": 1000,
        "reputationLoss": 2,
        "riskGain": 5,
        "generateVulnerability": true
      },
      "allowEquityReward": true,
      "independenceSensitive": false,
      "victoryConditions": [
        {
          "type": "minQuestions",
          "target": 2,
          "description": "完成至少2道题"
        },
        {
          "type": "correctRate",
          "target": 80,
          "description": "正确率达到80%"
        }
      ],
      "actionsAvailable": [
        {
          "id": "study",
          "name": "学习专项",
          "energyCost": 15,
          "effect": "下一题命中率+15%"
        },
        {
          "id": "question",
          "name": "做题攻关",
          "energyCost": 10,
          "effect": "答对推进进度+5%"
        },
        {
          "id": "expert",
          "name": "请法律顾问",
          "energyCost": 5,
          "cashCost": 1000,
          "effect": "风险-15"
        },
        {
          "id": "qc",
          "name": "法律审查",
          "energyCost": 15,
          "effect": "本回合答错风险减半"
        }
      ],
      "initialStatus": "available",
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "stagePreview": null
    },
    {
      "id": "case-law-con-001",
      "title": "合同纠纷连环案",
      "subject": "经济法",
      "topics": [
        "合同法",
        "要约",
        "承诺",
        "违约责任"
      ],
      "difficulty": 2,
      "deadlineTurns": 4,
      "description": "客户因合同条款理解分歧陷入多起纠纷，涉及要约承诺的生效时间、违约金计算等争议。",
      "enemy": "合同条款歧义 + 违约责任累积",
      "requiredSkill": {
        "economicLaw": 15
      },
      "questions": [
        "law-con-001"
      ],
      "targetCorrectRate": 80,
      "minQuestions": 1,
      "reward": {
        "cash": 6000,
        "reputation": 6,
        "skill": {
          "economicLaw": 4
        },
        "unlockCases": [
          "case-law-neg-001"
        ]
      },
      "riskOnFail": 10,
      "failureConsequences": {
        "cashLoss": 3000,
        "reputationLoss": 4,
        "riskGain": 10,
        "generateVulnerability": true
      },
      "allowEquityReward": true,
      "independenceSensitive": false,
      "victoryConditions": [
        {
          "type": "minQuestions",
          "target": 1,
          "description": "完成至少1道题"
        },
        {
          "type": "correctRate",
          "target": 80,
          "description": "正确率达到80%"
        }
      ],
      "actionsAvailable": [
        {
          "id": "study",
          "name": "学习专项",
          "energyCost": 15,
          "effect": "下一题命中率+15%"
        },
        {
          "id": "question",
          "name": "做题攻关",
          "energyCost": 10,
          "effect": "答对推进进度+5%"
        },
        {
          "id": "expert",
          "name": "请法律顾问",
          "energyCost": 5,
          "cashCost": 2000,
          "effect": "风险-15"
        },
        {
          "id": "qc",
          "name": "法律审查",
          "energyCost": 15,
          "effect": "本回合答错风险减半"
        }
      ],
      "initialStatus": "locked",
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "stagePreview": null
    },
    {
      "id": "case-law-neg-001",
      "title": "票据追索连环案",
      "subject": "经济法",
      "topics": [
        "票据法",
        "追索权",
        "背书",
        "连带责任"
      ],
      "difficulty": 2,
      "deadlineTurns": 4,
      "description": "客户持有的商业汇票被拒绝付款，向前手追索时发现背书链条存在瑕疵，追索对象和金额产生争议。",
      "enemy": "背书瑕疵 + 追索对象争议",
      "requiredSkill": {
        "economicLaw": 20
      },
      "questions": [
        "law-neg-001",
        "law-neg-002"
      ],
      "targetCorrectRate": 80,
      "minQuestions": 2,
      "reward": {
        "cash": 8000,
        "reputation": 8,
        "skill": {
          "economicLaw": 5
        },
        "unlockCases": [
          "case-law-bkr-001"
        ]
      },
      "riskOnFail": 12,
      "failureConsequences": {
        "cashLoss": 4000,
        "reputationLoss": 5,
        "riskGain": 12,
        "generateVulnerability": true
      },
      "allowEquityReward": true,
      "independenceSensitive": false,
      "victoryConditions": [
        {
          "type": "minQuestions",
          "target": 2,
          "description": "完成至少2道题"
        },
        {
          "type": "correctRate",
          "target": 80,
          "description": "正确率达到80%"
        }
      ],
      "actionsAvailable": [
        {
          "id": "study",
          "name": "学习专项",
          "energyCost": 15,
          "effect": "下一题命中率+15%"
        },
        {
          "id": "question",
          "name": "做题攻关",
          "energyCost": 10,
          "effect": "答对推进进度+5%"
        },
        {
          "id": "expert",
          "name": "请法律顾问",
          "energyCost": 5,
          "cashCost": 3000,
          "effect": "风险-15"
        },
        {
          "id": "qc",
          "name": "法律审查",
          "energyCost": 15,
          "effect": "本回合答错风险减半"
        }
      ],
      "initialStatus": "locked",
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "stagePreview": null
    },
    {
      "id": "case-law-bkr-001",
      "title": "濒危客户破产重整",
      "subject": "经济法",
      "topics": [
        "破产法",
        "重整",
        "管理人",
        "债权人会议"
      ],
      "difficulty": 3,
      "deadlineTurns": 5,
      "description": "客户的主要债务人进入破产程序，客户作为债权人需要参与债权人会议，同时评估债务人的重整方案。",
      "enemy": "重整方案不利 + 债权清偿率低",
      "requiredSkill": {
        "economicLaw": 25
      },
      "questions": [
        "law-bkr-001"
      ],
      "targetCorrectRate": 80,
      "minQuestions": 1,
      "reward": {
        "cash": 12000,
        "reputation": 12,
        "skill": {
          "economicLaw": 8
        },
        "unlockCases": []
      },
      "riskOnFail": 15,
      "failureConsequences": {
        "cashLoss": 6000,
        "reputationLoss": 8,
        "riskGain": 15,
        "generateVulnerability": true
      },
      "allowEquityReward": true,
      "independenceSensitive": false,
      "victoryConditions": [
        {
          "type": "minQuestions",
          "target": 1,
          "description": "完成至少1道题"
        },
        {
          "type": "correctRate",
          "target": 80,
          "description": "正确率达到80%"
        }
      ],
      "actionsAvailable": [
        {
          "id": "study",
          "name": "学习专项",
          "energyCost": 15,
          "effect": "下一题命中率+15%"
        },
        {
          "id": "question",
          "name": "做题攻关",
          "energyCost": 10,
          "effect": "答对推进进度+5%"
        },
        {
          "id": "expert",
          "name": "请法律顾问",
          "energyCost": 5,
          "cashCost": 5000,
          "effect": "风险-15"
        },
        {
          "id": "qc",
          "name": "法律审查",
          "energyCost": 15,
          "effect": "本回合答错风险减半"
        }
      ],
      "initialStatus": "locked",
      "version": {
        "year": 2026,
        "source": "示例内容",
        "aiGenerated": false,
        "verified": false
      },
      "isSampleContent": true,
      "stagePreview": "大型事务所解锁更多破产重整案件"
    }
  ]
}
```
