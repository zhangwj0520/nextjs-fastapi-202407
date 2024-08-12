export default `# QA 和文档聊天

通过“数据”进行聊天和问答（QA）是流行的LLM用例。

“数据”可以包括许多内容，包括：

* “非结构化数据”（例如，PDF）
* \'结构化数据\'（例如，SQL）
* \'代码\'（例如，Python）

下面我们将回顾关于“非结构化数据”的聊天和 QA。

![intro.png]（/图片/qa_intro.png）

“非结构化数据”可以从许多来源加载。

查看 [文档加载器集成]（/docs/modules/data_connection/document_loaders/） 以浏览支持的加载器集。

每个加载器以 LangChain \'Document\' 的形式返回数据。

“文档”将按照以下一般步骤转换为聊天或 QA 应用程序：

* \'Splitting\'： [文本拆分器]（/docs/modules/data_connection/document_transformers/） 将 \'Documents\' 拆分为指定大小的拆分
* \'Storage\'：存储（例如，通常 [vectorstore]（/docs/modules/data_connection/vectorstores/）） 将容纳 [并且经常嵌入]（https://www.pinecone.io/learn/vector-embeddings/） 拆分
* \'Retrieval\'：应用程序从存储中检索拆分（例如，通常 [具有相似的嵌入]（https://www.pinecone.io/learn/k-nearest-neighbor/） 到输入问题）
* \'Output\'： [LLM]（/docs/modules/model_io/models/llms/） 使用包含问题和检索到的拆分的提示生成答案

![flow.jpeg]（/图片/qa_flow.jpeg）

## 快速入门

让我们将这篇 [博客文章]（https://lilianweng.github.io/posts/2023-06-23-agent/） 加载到代理上作为示例 \'Document\'。

我们将在几行代码中拥有一个 QA 应用程序。

首先，设置环境变量并安装指南所需的软件包：

\'\'\'壳
>纱线添加 Cheerio
# 或者以你喜欢的方式加载 env vars：
>导出 OPENAI_API_KEY=“...”
\`\`\`

## 1.加载、拆分、存储

### 1.1 入门

指定一个 \'Document\' 加载器。

\'\'\'打字稿
文档加载器
import { CheerioWebBaseLoader } from “langchain/document_loaders/web/cheerio”;

const loader = new CheerioWebBaseLoader（
  “https://lilianweng.github.io/posts/2023-06-23-agent/”
);
常量数据 = await loader.load（）;
\`\`\`

将“文档”拆分为块，以便嵌入和矢量存储。

\'\'\'打字稿
import { RecursiveCharacterTextSplitter } from “langchain/text_splitter”;

const textSplitter = new RecursiveCharacterTextSplitter（{
  chunkSize：500，
  chunk重叠：0，
});

const splitDocs = 等待 textSplitter.splitDocuments（data）;
\`\`\`

将拆分嵌入并存储在向量数据库中（出于演示目的，我们使用未优化的内存中示例，但您可以 [在此处浏览集成]（/docs/modules/data_connection/vectorstores/integrations/））：

\'\'\'打字稿
import { OpenAIEmbeddings } from “langchain/embeddings/openai”;
import { MemoryVectorStore } from “langchain/vectorstores/memory”;

const embeddings = 新的 OpenAIEmbeddings（）;

const vectorStore = await MemoryVectorStore.fromDocuments（splitDocs， embeddings）;
\`\`\`

以下是这三个部分：

![lc.png]（/图片/qa_data_load.png）

### 1.2 深入了解

#### 1.2.1 集成

\'文档加载程序\'

* 浏览文档加载器集成 [此处]（/docs/modules/data_connection/document_loaders/）。

* 请参阅有关加载器的更多文档[此处]（/docs/modules/data_connection/document_loaders/）。

\'文档转换器\'

* 所有人都可以摄取加载的“文档”并处理它们（例如，拆分）。

* 有关变压器的更多文档[此处]（/docs/modules/data_connection/document_transformers/）。

\'向量存储\'

* 浏览 vectorstore 集成 [这里]（/docs/modules/data_connection/vectorstores/integrations/）。

* 请参阅有关 vectorstores 的更多文档 [此处]（/docs/modules/data_connection/vectorstores/）。

## 2.检索

### 2.1 入门

使用 \'similarity_search\' 检索任何问题的 [相关拆分]（https://www.pinecone.io/learn/what-is-similarity-search/）。

\'\'\'打字稿
const relevantDocs = await vectorStore.similaritySearch（“什么是任务分解？”）;

console.log（相关文档长度）;

// 4
\`\`\`

### 2.2 深入了解

#### 2.2.1 检索

向量存储通常用于检索。

但是，它们并不是唯一的选择。

例如，也可以使用 SVM（参见线程 [此处]（https://twitter.com/karpathy/status/1647025230546886658?s=20））。

LangChain [有许多检索器和检索方法]（/docs/modules/data_connection/retrievers/），包括但不限于向量存储。

所有检索器都实现了一些常用方法，例如 \'getRelevantDocuments（）\'。

## 3.质量保证

### 3.1 入门

使用带有 \'RetrievalQA\' 链的 LLM（例如，\'gpt-3.5-turbo\'）将检索到的文档提炼成答案。

\'\'\'打字稿
import { RetrievalQAChain } from “langchain/chains”;
从“langchain/chat_models/openai”导入{ChatOpenAI };

const model = new ChatOpenAI（{ modelName： “gpt-3.5-turbo” }）;
常量链 = RetrievalQAChain.fromLLM（model， vectorstore.asRetriever（））;

常量响应 = await chain.call（{
  查询：“什么是任务分解？
});
console.log（回应）;

/*
  {
    文本：“任务分解是指将较大的任务分解为更小、更易于管理的子目标的过程。通过分解任务，代理或系统可以更轻松地有效地处理复杂的任务。任务分解可以通过各种方法完成，例如使用提示或特定于任务的指令，或通过人工输入。它有助于规划和组织有效完成任务所需的步骤。
  }
*/
\`\`\`

### 3.2 更深入

#### 3.2.1 集成

\'LLMs\'

* 浏览 LLM 集成和更多文档 [这里]（/docs/modules/model_io/models/）。

#### 3.2.2 自定义提示

“RetrievalQA”链中的提示可以按如下方式自定义。

\'\'\'打字稿
import { RetrievalQAChain } from “langchain/chains”;
从“langchain/chat_models/openai”导入{ChatOpenAI };
import { PromptTemplate } from “langchain/prompts”;

const model = new ChatOpenAI（{ modelName： “gpt-3.5-turbo” }）;

const template = \'使用以下上下文来回答最后的问题。
如果你不知道答案，就说你不知道，不要试图编造答案。
最多使用三句话，并尽可能保持答案简洁。
总是在答案的末尾说“谢谢你的提问！
{上下文}
问题：{question}
有用的答案：\';

const chain = RetrievalQAChain.fromLLM（model， vectorstore.asRetriever（）， {
  提示：PromptTemplate.fromTemplate（template），
});

常量响应 = await chain.call（{
  查询：“什么是任务分解？
});

console.log（回应）;

/*
  {
    文本：“任务分解是将大型任务分解为更小、更易于管理的子目标的过程。这样可以有效地处理复杂的任务，并有助于规划和组织实现总体目标所需的步骤。谢谢你的提问！
  }
*/
\`\`\`

#### 3.2.3 返回源文档

可以使用 \'return_source_documents=True\' 返回用于答案蒸馏的检索到的文档集。

\'\'\'打字稿
import { RetrievalQAChain } from “langchain/chains”;
从“langchain/chat_models/openai”导入{ChatOpenAI };

const model = new ChatOpenAI（{ modelName： “gpt-3.5-turbo” }）;

const chain = RetrievalQAChain.fromLLM（model， vectorstore.asRetriever（）， {
  returnSourceDocuments：true
});

常量响应 = await chain.call（{
  查询：“什么是任务分解？
});

console.log（response.sourceDocuments[0]）;

/*
文档 {
  pageContent： '任务分解可以 （1） 由 LLM 完成，只需简单的提示，例如“XYZ 的步骤。\\n1.”、“实现 XYZ 的子目标是什么？”，（2） 使用特定于任务的指令;例如，“写一个故事大纲”来写小说，或（3）用人工输入。
  元数据：[对象]
}
*/
\`\`\`

#### 3.2.4 在 LLM 提示符下自定义检索到的文档

检索到的文档可以通过几种不同的方式提供给 LLM 进行答案提炼。

\'stuff\'、\'refine\' 和 \'map-reduce\' 用于将文档传递到 LLM 提示符的链被很好地总结了 [这里]（/docs/modules/chains/document/）。

“stuff”是常用的，因为它只是将所有检索到的文档“塞”到提示中。

[loadQAChain]（/docs/modules/chains/document/） 方法是使用这些不同的方法将文档传递给 LLM 的简单方法。

\'\'\'打字稿
import { loadQAStuffChain } from “langchain/chains”;

const stuffChain = loadQAStuffChain（model）;

const stuffResult = await stuffChain.call（{
  input_documents：相关文档，
  问题：“什么是任务分解
});

console.log（stuffResult）;
/*
{
  文本：“任务分解是将大型任务分解为更小、更易于管理的子目标或步骤的过程。这允许通过一次专注于一个子目标来有效地处理复杂的任务。任务分解可以通过各种方法完成，例如使用简单的提示、特定于任务的指令或人工输入。
}
*/
\`\`\`

## 4.聊天

### 4.1 入门

为了保留聊天记录，我们使用了前一个链的变体，称为“ConversationalRetrievalQAChain”。
首先，指定一个“内存缓冲区”来跟踪对话输入/输出。

\'\'\'打字稿
import { ConversationalRetrievalQAChain } from “langchain/chains”;
import { BufferMemory } from “langchain/memory”;
从“langchain/chat_models/openai”导入{ChatOpenAI };

常量内存 = new BufferMemory（{
  memoryKey：“chat_history”，
  returnMessages： true，
});
\`\`\`

接下来，我们初始化并调用链：

\'\'\'打字稿
const model = new ChatOpenAI（{ modelName： “gpt-3.5-turbo” }）;
const chain = ConversationalRetrievalQAChain.fromLLM（model， vectorstore.asRetriever（）， {
  记忆
});

常量结果 = await chain.call（{
  问题：自我反省的主要思想是什么？
});
console.log（结果）;

/*
{
  文本：“自我反省的一些主要思想包括：\n' +
    '\n' +
    '1. 迭代改进：自我反思允许自主代理通过不断完善过去的行动决策和纠正错误来改进。
    '\n' +
    '2. 试错：自我反省在现实世界的任务中起着至关重要的作用，因为试错是不可避免的。它可以帮助智能体从失败的轨迹中吸取教训，并为未来的行动做出调整。
    '\n' +
    '3. 建设性批评：代理人对他们的大局行为进行建设性的自我批评，以确定需要改进的领域。
    '\n' +
    '4. 决策和策略改进：对过去的决策和策略的反思使代理人能够改进他们的方法并做出更明智的选择。
    '\n' +
    '5. 效率和优化：自我反思鼓励智能体在行动中变得聪明和高效，旨在以最少的步骤完成任务。
    '\n' +
    “这些想法强调了自我反省在提高绩效和指导未来行动方面的重要性。”
}
*/
\`\`\`

“内存缓冲区”具有解决以下问题中的“它”（“自我反思”）的上下文。

\'\'\'打字稿
const followupResult = await chain.call（{
  问题：Reflexion 论文如何处理它？
});
console.log（followupResult）;

/*
{
  文本：“Reflexion论文引入了一个框架，该框架为智能体提供了动态记忆和自我反思能力，以提高他们的推理能力。该方法涉及向智能体展示双次示例，其中每个示例都包含一个失败的轨迹和对如何指导智能体计划未来变化的理想反思。然后，这些反射将作为查询语言模型的上下文添加到代理的工作内存中。代理人使用这种自我反思信息来决定是开始新的试验还是继续当前的计划。
}
*/
\`\`\`

### 4.2 更深入

\'ConversationalRetrievalQAChain\' 上的 [documentation]（/docs/modules/chains/popular/chat_vector_db） 提供了一些扩展，例如流式处理和源文档。

# 会话检索代理

这是一个专门针对在必要时进行检索而优化的代理，同时进行对话并能够
根据对话中先前的对话回答问题。

首先，我们将设置要使用的检索器，然后将其转换为检索器工具。接下来，我们将使用这种类型的代理的高级构造函数。
最后，我们将演练如何从组件构造会话检索代理。

## 猎犬

首先，我们需要一只猎犬来使用！这里的代码大多只是示例代码。随意使用您自己的检索器，并跳到下一节创建检索器工具。

\'\'\'打字稿
import { FaissStore } from “langchain/vectorstores/faiss”;
import { OpenAIEmbeddings } from “langchain/embeddings/openai”;
import { TextLoader } from “langchain/document_loaders/fs/text”;
import { RecursiveCharacterTextSplitter } from “langchain/text_splitter”;

const loader = new TextLoader（“state_of_the_union.txt”）;
常量文档 = await loader.load（）;
const splitter = new RecursiveCharacterTextSplitter（{
  chunkSize：1000，
  chunk重叠：0
});

const texts = await splitter.splitDocuments（docs）;

const vectorStore = await FaissStore.fromDocuments（texts， new OpenAIEmbeddings（））;

常量检索器 = vectorStore.asRetriever（）;
\`\`\`

## 检索工具

现在我们需要为我们的猎犬创建一个工具。我们需要传入的主要内容是检索器的“名称”以及“描述”。这些都将由语言模型使用，因此它们应该具有信息性。

\'\'\'打字稿
import { createRetrieverTool } from “langchain/agents/toolkits”;

const tool = createRetrieverTool（retriever， {
  名称：“search_state_of_union”，
  描述： “搜索并返回有关国情咨文的文件”，
});
\`\`\`

## Agent 构造函数

在这里，我们将使用高级 \'create_conversational_retrieval_agent\' API 来构造代理。
请注意，除了工具列表之外，我们唯一需要传入的是要使用的语言模型。

在引擎盖下，这个代理使用的是 OpenAIFunctionsAgent，因此我们需要使用 ChatOpenAI 模型。

\'\'\'打字稿
import { createConversationalRetrievalAgent } from “langchain/agents/toolkits”;
从“langchain/chat_models/openai”导入{ChatOpenAI };

const model = 新 ChatOpenAI（{
  温度：0，
});

const executor = await createConversationalRetrievalAgent（model， [工具]， {
  详细：真，
});
\`\`\`

我们现在可以尝试一下了！

\'\'\'打字稿
常量结果 = await executor.call（{
  输入：“嗨，我是鲍勃！
});

console.log（结果）;

/*
  {
    输出：'你好鲍勃！我今天能帮你什么？
    中间步骤：[]
  }
*/

常量结果2 = await executor.call（{
  输入：“我叫什么名字？
});

console.log（结果2）;

/*
  { output： '你的名字是 Bob.'， intermediateSteps： [] }
*/

const result3 = await executor.call（{
  输入：“总统在最近的国情咨文中对凯坦吉·布朗·杰克逊说了什么？
});

console.log（结果3）;

/*
  {
    输出：“在最近的国情咨文中，拜登总统提到了凯坦吉·布朗·杰克逊。他提名她为巡回上诉法院法官，并将她描述为美国顶尖的法律思想家之一，将延续布雷耶大法官的卓越遗产。他提到，她得到了广泛的支持，包括来自警察兄弟会和民主党人和共和党人任命的前法官。
    中间步骤：[
      {...}
    ]
  }
*/

常量结果4 = await executor.call（{
  输入：“他多久前提名了她？
});

console.log（结果4）;

/*
  {
    输出：“拜登总统在最近的国情咨文演讲前四天提名了凯坦吉·布朗·杰克逊。
    中间步骤：[]
  }
*/
\`\`\`

请注意，对于最终调用，代理使用先前检索到的信息来回答查询，并且不需要再次调用该工具！

下面是一个跟踪，显示了代理如何获取文档以使用检索工具回答问题：

https://smith.langchain.com/public/1e2b1887-ca44-4210-913b-a69c1b8a8e7e/r

## 从组件创建

引擎盖下到底发生了什么？让我们看一下，以便我们了解如何修改未来的内容。

### 内存

在此示例中，我们希望代理不仅记住之前的对话，还记住以前的中间步骤。
为此，我们可以使用 \'OpenAIAgentTokenBufferMemory\'。请注意，如果要更改代理是否记住中间步骤，
保留缓冲区的长度，或类似的东西，您应该更改此部分。

\'\'\'打字稿
import { OpenAIAgentTokenBufferMemory } from “langchain/agents/toolkits”;

常量内存 = new OpenAIAgentTokenBufferMemory（{
  llm： 模型，
  memoryKey：“chat_history”，
  outputKey： “输出”
});
\`\`\`

对于 OpenAI 函数代理，您应该确保将 \'memoryKey\' 设置为 \'“chat_history”\'，并且将 \'outputKey\' 设置为 \''output“\'。
默认情况下，此内存还将 \'returnMessages\' 设置为 \'true\'。

您还可以通过使用预加载的聊天历史记录初始化之前对话中的消息，将消息加载到此内存中：

\'\'\'打字稿
从“langchain/chat_models/openai”导入{ChatOpenAI };
import { OpenAIAgentTokenBufferMemory } from “langchain/agents/toolkits”;
import { HumanMessage， AIMessage } from “langchain/schema”;
从“langchain/memory”导入{ChatMessageHistory };

const previousMessages = [
  new HumanMessage（“我的名字是 Bob”），
  new AIMessage（“很高兴见到你，鲍勃！
];

const chatHistory = new ChatMessageHistory（previousMessages）;

常量内存 = new OpenAIAgentTokenBufferMemory（{
  llm：新 ChatOpenAI（{}），
  memoryKey：“chat_history”，
  outputKey： “输出”，
  聊天历史，
});
\`\`\`

### 代理执行程序

我们可以直接使用 \'initializeAgentExecutorWithOptions\' 方法重新创建代理执行器。
这允许我们通过将 \'prefix\' 传递到 \'agentArgs\' 中来自定义代理的系统消息。
重要的是，我们必须传入 \'return_intermediate_steps： true'，因为我们是用内存对象记录的。

\'\'\'打字稿
import { initializeAgentExecutorWithOptions } from “langchain/agents”;

const executor = await initializeAgentExecutorWithOptions（tools， llm， {
  agentType： “openai-functions”，
  记忆
  returnIntermediateSteps： true，
  agentArgs：{
    前缀：
      前缀？？
      \'尽你最大的努力回答问题。仅在必要时，请随意使用任何可用的工具来查找相关信息。
  },
});
\`\`\`
`
