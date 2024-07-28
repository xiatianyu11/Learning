Apache Kafka 是一个开源的分布式基于发布订阅模式的消息队列。
它的设计目标是处理高吞吐量的消息流，并提供低延迟、高可靠性的数据传输。

新定义： Event stream platform

比如： log Flume -> hapdeep(100ms/s)
      log flume -> kafka -> hadeep(200m/s)

下面是 Kafka 的一些关键特性和组成部分的详解：

1. 核心概念
1.1 Topic
Topic 是 Kafka 中消息的类别。它可以看作是一个消息的日志流。生产者将消息发布到一个或多个 topic 中，消费者从这些 topic 中读取消息。
每个 topic 可以有多个分区 (Partition)。
1.2 Partition
Partition 是 topic 的一个逻辑分片。每个 partition 是一个有序的、不可变的消息日志，它不断追加消息。
每个 partition 内的消息都有一个唯一的偏移量 (Offset)，表示消息在 partition 中的位置。
leader: 生产和消费只对leader
follower: leader 挂了，变成leader
1.3 Broker
Broker 是 Kafka 集群中的一个服务器实例。每个 broker 可以处理多个 topic 的多个 partition。
Kafka 集群中的每个 broker 负责存储 topic 分区的数据，并处理客户端的读写请求。
1.4 Zookeeper
Zookeeper 是一个分布式协调服务，用于管理 Kafka 集群的元数据和协调 broker 的工作。它用于选举 leader、存储配置等。
在 Kafka 3.x 版本及之后，Kafka 引入了 KRaft 模式，逐步减少对 Zookeeper 的依赖。
记录集群的broker和主题leader信息

1.5 Producer
Producer 是向 Kafka topic 发送消息的客户端应用程序。生产者可以选择将消息发送到一个或多个 topic 和 partition。
1.6 Consumer
Consumer 是从 Kafka topic 中读取消息的客户端应用程序。消费者通常会作为消费组 (Consumer Group) 的一部分工作，以实现负载均衡和消息处理的并发性。
1.7 Consumer Group
Consumer Group 是一个由多个消费者组成的组，它们共同消费一个或多个 topic 的消息。每个 partition 中的消息只会被同一个组中的一个消费者处理，从而实现负载均衡。
3. 主要特性
2.1 高吞吐量
Kafka 能够处理大量的数据流，适用于需要高吞吐量的数据传输场景。
2.2 低延迟
Kafka 提供低延迟的数据传输，适合实时数据处理应用。
2.3 可扩展性
Kafka 集群可以通过增加 broker 节点来水平扩展，以处理更多的分区和更大的数据量。
2.4 持久性
Kafka 的消息是持久化存储的，即使消息已经被消费，它们仍然会保留在磁盘上，直到达到配置的保留时间或日志大小限制。
2.5 高可用性
Kafka 支持数据副本机制，每个 partition 都可以有多个副本。通过选举 leader 和 followers 的方式，实现故障转移和数据的高可用性。
2.6 可分区
Kafka 的 topic 可以分为多个 partition，允许并行处理消息，并实现更高的吞吐量。
4. 工作流程
3.1 生产者发送消息
生产者将消息发送到指定的 topic。消息会被分配到一个 partition 中，具体的 partition 分配策略可以由生产者配置。

3.1.1 确认（Acknowledgment）
生产者可以配置不同的确认级别（acks），例如：
acks=0：生产者不等待任何 broker 的确认。
acks=1：生产者等待 leader broker 确认消息已写入。
acks=all（或 acks=-1）：生产者等待所有副本都确认消息已写入。

3.2 消息存储
消息会被追加到 partition 的末尾。Kafka 持久化这些消息，并将其存储在磁盘上。

3.2.1 保留策略
消息在 partition 的日志文件中会根据 topic 的保留策略进行保留。保留策略可以是基于时间（例如，保留 7 天）或大小（例如，日志文件达到一定大小）。

3.3 消费者读取消息
消费者从 Kafka 订阅的 topic 中读取消息。每个 consumer 可以读取到分配给它的 partition 中的消息，并处理这些消息。
3.4 消费者提交偏移量
消费者处理完消息后，通常会提交其偏移量，以便在系统崩溃后可以从正确的位置继续处理。
5. 部署和配置
4.1 集群部署
Kafka 集群通常由多个 broker 组成，这些 broker 可以部署在不同的服务器上。集群的规模可以根据需要进行扩展。
4.2 配置
Kafka 提供了丰富的配置选项，用于调整性能、存储策略、安全设置等。配置包括 broker 配置、topic 配置、生产者和消费者配置等。
Kafka 是一个强大的流处理平台，它的设计使得它非常适合于需要高吞吐量、低延迟和高可用性的分布式系统。
