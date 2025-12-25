# 简历管理 Agent - 快速参考

## 一分钟快速开始

### 第 1 步：唤醒 Agent
```
周永祥的简历
```

### 第 2 步：上传 PDF
拖拽或点击上传你的 PDF 文件

### 第 3 步：回答 4-5 个问题
- 文档类型？→ 1/2/3/4
- 语言版本？→ 1/2/3
- 英文标题？→ 输入标题
- 中文标题？→ 输入标题
- （可选）副标题

### 第 4 步：确认
回复"是"完成添加

✅ 完成！

---

## 文档类型速查

| 数字 | 类型 | 英文 | 用途 |
|------|------|------|------|
| 1 | resume | Resume | 个人简历 |
| 2 | portfolio | Portfolio | 作品集项目 |
| 3 | degree | Degree | 学位证书 |
| 4 | coursera | Coursera | 在线课程证书 |

---

## 常用命令

### 查看当前文档
```bash
# 进入项目目录
cd C:\Users\64528\Desktop\MyResume\joe-portfolio

# 查看所有 PDF
ls public/*.pdf

# 查看文档配置
code src/constants.ts
```

### 本地预览
```bash
npm run dev
# 打开 http://localhost:5173
```

### 构建部署
```bash
npm run build
# dist 目录可部署
```

---

## 唤醒密语

```
周永祥的简历
```

如果密语不生效，尝试：
1. 确保在项目目录中
2. 重新输入密语
3. 直接说"帮我添加简历文档"

---

## 典型对话示例

### 添加简历
```
你: 周永祥的简历
[上传 Joe_Resume_v4.pdf]

Agent: 这个PDF是什么类型？
你: 1

Agent: 哪个语言版本？
你: 1 (英文版)

Agent: 英文标题？
你: Joe Zhou - English Resume

Agent: 中文标题？
你: 周永祥 - 英文简历

Agent: 英文副标题？
你: Professional CV

Agent: 中文副标题？
你: 专业版

Agent: 确认添加吗？
你: 是

Agent: ✅ 完成！
```

---

## 文件命名建议

```
简历:        Joe_Zhou_Resume_[En/Zh]_v{N}.pdf
作品集:      {Project_Name}_{Type}.pdf
证书:        {Cert_Name}_Cert.pdf
```

---

## 需要帮助？

查看详细文档：`.claude/RESUME_AGENT_README.md`

---

**提示：** 关闭终端后重新打开，只需进入项目目录并输入唤醒密语即可继续使用！
