package com.sgst.approval.workflow;


import java.util.*;
import java.util.function.Function;

// 节点
class Node {
    private final String id;
    private final Function<Map<String, Object>, Map<String, Object>> task;

    public Node(String id, Function<Map<String, Object>, Map<String, Object>> task) {
        this.id = id;
        this.task = task;
    }

    public String getId() {
        return id;
    }

    public Map<String, Object> run(Map<String, Object> input) {
        return task.apply(input);
    }
}

package com.sgst.approval.workflow;
import java.util.*;
import java.util.function.Function;

// 工作流图
class Workflow {
    private final Map<String, Node> nodes = new HashMap<>();
    private final Map<String, List<String>> edges = new HashMap<>();
    private String startNodeId;

    public void addNode(Node node) {
        nodes.put(node.getId(), node);
    }

    public void addEdge(String fromId, String toId) {
        edges.computeIfAbsent(fromId, k -> new ArrayList<>()).add(toId);
    }

    public void setStartNode(String nodeId) {
        this.startNodeId = nodeId;
    }

    public void run(Map<String, Object> input) {
        if (startNodeId == null) throw new IllegalStateException("未设置开始节点");
        executeNode(startNodeId, input);
    }

    private void executeNode(String nodeId, Map<String, Object> input) {
        Node node = nodes.get(nodeId);
        if (node == null) throw new IllegalArgumentException("未找到节点: " + nodeId);

        System.out.println("执行节点: " + nodeId);
        Map<String, Object> output = node.run(input);

        if (edges.containsKey(nodeId)) {
            for (String nextId : edges.get(nodeId)) {
                executeNode(nextId, output);
            }
        }
    }
}



package com.sgst.approval.workflow;
import java.util.*;
import java.util.function.Function;
public class WorkflowDemo {
    public static void main(String[] args) {
        Workflow wf = new Workflow();

        // 节点1: 输入处理
        wf.addNode(new Node("input", input -> {
            String text = (String) input.get("text");
            Map<String, Object> out = new HashMap<>();
            out.put("msg", "原始输入: " + text);
            return out;
        }));

        // 节点2: 转大写
        wf.addNode(new Node("uppercase", input -> {
            String msg = (String) input.get("msg");
            Map<String, Object> out = new HashMap<>();
            out.put("msg", msg.toUpperCase());
            return out;
        }));

        // 节点3: 输出结果
        wf.addNode(new Node("output", input -> {
            System.out.println("最终结果: " + input.get("msg"));
            return input;
        }));

        // 定义依赖关系 input -> uppercase -> output
        wf.addEdge("input", "uppercase");
        wf.addEdge("uppercase", "output");

        // 设置起始节点
        wf.setStartNode("input");

        // 运行
        Map<String, Object> init = new HashMap<>();
        init.put("text", "hello langchain graph in java");
        wf.run(init);
    }
}


