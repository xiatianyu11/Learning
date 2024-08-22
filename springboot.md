# 配置 Undertow 的 I/O 线程数，通常与 CPU 核心数相同
server.undertow.threads.io=8

# 配置 Undertow 的 Worker 线程数，通常比 I/O 线程多
server.undertow.threads.worker=64



3.2 自动适应资源限制
你可以使用 OpenShift 提供的资源限制（如 CPU 和内存限制）来自动调整线程数。例如，你可以在启动脚本或应用初始化代码中，根据可用 CPU 核心数来动态设置线程数：

int availableProcessors = Runtime.getRuntime().availableProcessors();
int ioThreads = availableProcessors;
int workerThreads = availableProcessors * 8; // 根据经验值或具体应用需求调整倍数

System.setProperty("server.undertow.threads.io", String.valueOf(ioThreads));
System.setProperty("server.undertow.threads.worker", String.valueOf(workerThreads));




Memory updated
Spring Boot Actuator 是 Spring Boot 项目中的一个非常重要的组件，它提供了一系列生产级的功能，如监控和管理应用程序的能力。这些功能包括健康检查、指标监控、应用信息、环境属性、日志配置等。
Actuator 使得开发者和运维人员能够更好地了解和管理 Spring Boot 应用的运行状态。

1. Spring Boot Actuator 的基本功能
Actuator 提供了很多内置的端点（endpoints），这些端点暴露了应用程序的内部状态和运行信息。以下是一些常用的 Actuator 端点：

/actuator/health：显示应用程序的健康状态。
/actuator/info：显示应用的基本信息（如版本号、描述等）。
/actuator/metrics：提供应用的各类指标数据（如内存使用、垃圾收集、线程信息等）。
/actuator/env：显示应用的所有环境属性，包括配置文件、系统属性、环境变量等。
/actuator/loggers：显示和修改日志级别的相关信息。



3.1 暴露端点
在默认配置下，并不是所有的 Actuator 端点都对外暴露。如果你希望暴露所有端点，可以在 application.properties 文件中进行配置：
management.endpoints.web.exposure.include=*

如果你只想暴露特定的端点，可以这样配置：
management.endpoints.web.exposure.include=health,info,metrics


4. 常用的 Actuator 端点详解
4.1 /actuator/health
这个端点用于检查应用程序的健康状态。默认情况下，它只会返回一个简单的状态（如 UP 或 DOWN），但你可以通过自定义健康检查组件来增加更多的信息：
@Component
public class MyHealthIndicator implements HealthIndicator {
    @Override
    public Health health() {
        boolean healthy = checkHealth();
        if (healthy) {
            return Health.up().withDetail("status", "All systems go!").build();
        } else {
            return Health.down().withDetail("error", "Something went wrong").build();
        }
    }

    private boolean checkHealth() {
        // 实现自定义的健康检查逻辑
        return true;
    }
}


4.3 /actuator/metrics
这个端点提供了丰富的指标数据，如 JVM 内存使用、CPU 负载、垃圾收集次数、请求次数等。你可以通过这个端点来监控应用的运行状况。例如，查看 HTTP 请求的统计数据：
management.metrics.web.server.auto-time-requests=true


5.1 集成 Prometheus 和 Grafana
Actuator 的指标功能可以与 Prometheus 集成，用于收集和分析应用的运行数据。配置方式如下：

引入 Prometheus 的依赖：
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>


暴露 Prometheus 端点：
management.endpoints.web.exposure.include=prometheus

然后，你可以在 /actuator/prometheus 端点获取 Prometheus 格式的指标数据。

5.2 自定义端点
除了使用内置的端点，你还可以创建自定义的 Actuator 端点来满足特定需求：
@Component
@Endpoint(id = "customEndpoint")
public class CustomEndpoint {

    @ReadOperation
    public Map<String, String> custom() {
        return Collections.singletonMap("message", "Hello from custom endpoint!");
    }
}

@Component
@Endpoint(id = "customEndpoint")
public class CustomEndpoint {

    @ReadOperation
    public Map<String, String> custom() {
        return Collections.singletonMap("message", "Hello from custom endpoint!");
    }
}


这个自定义端点可以通过 /actuator/customEndpoint 访问。





