1. 设置内存参数
1.1. Heap Size（堆内存大小）
-Xms 和 -Xmx：用于设置堆的初始大小和最大大小。通常，-Xms 和 -Xmx 设置为相同的值，以避免动态调整堆大小导致的性能开销。

-Xms2g -Xmx2g

-Xmn：设置年轻代的大小。年轻代的大小应根据应用程序的内存分配率进行调整。通常，它的大小设置为堆内存的 1/3 到 1/4。
-Xmn512m

1.2. Metaspace（元空间）
-XX:MetaspaceSize 和 -XX:MaxMetaspaceSize：用于设置元空间的初始大小和最大大小。元空间是用于存储类的元数据的区域。
-XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=512m

2. 垃圾收集器调优
选择合适的垃圾收集器对于应用程序的性能至关重要。常用的垃圾收集器包括：

Serial GC (-XX:+UseSerialGC)：适用于单线程环境和低内存应用。
Parallel GC (-XX:+UseParallelGC)：默认垃圾收集器，适用于吞吐量优先的应用。
G1 GC (-XX:+UseG1GC)：适用于低延迟应用，适合大多数服务端应用场景。
ZGC (-XX:+UseZGC)：适用于大内存、高吞吐量、低延迟的应用。


2.1. G1 GC 调优
G1垃圾收集器是现代Java应用中常用的垃圾收集器。可以通过以下参数进行调优：

-XX:MaxGCPauseMillis：设置期望的最大GC停顿时间。G1会尝试在这个时间范围内完成垃圾收集。

-XX:MaxGCPauseMillis=200

-XX:InitiatingHeapOccupancyPercent：设置在堆使用率达到一定百分比时触发混合垃圾收集（混合收集会同时回收年轻代和老年代的对象）。
-XX:InitiatingHeapOccupancyPercent=45

-XX:G1ReservePercent：设置保留多少百分比的堆空间用于垃圾收集。
-XX:G1ReservePercent=10

线程堆栈大小：通过设置-Xss参数来调整每个线程的堆栈大小。对于高并发的应用，可以减小堆栈大小以增加可创建线程的数量。
-Xss512k

并行垃圾收集线程：可以使用-XX:ParallelGCThreads来控制并行GC线程的数量。
-XX:ParallelGCThreads=8
