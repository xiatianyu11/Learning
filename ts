作为 Java 架构师，我将指导你开发一个 EJB 应用程序，使用 Spring MVC 和 JSP 作为 Web 层，并通过 EAR 包部署到 JBoss EAP 8 上。以下是详细的步骤和代码实现。

1. 项目结构
项目采用 Maven 多模块结构，分为以下模块：

ejb-module：包含 EJB 组件。

web-module：包含 Spring MVC 和 JSP。

ear-module：将 EJB 和 Web 模块打包为 EAR 文件。

项目结构如下：

Copy
ejb-springmvc-ear/
├── ejb-module/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/ejb/
│   │   │   │       └── HelloWorldBean.java
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
├── web-module/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/web/
│   │   │   │       ├── controller/HelloWorldController.java
│   │   │   │       └── config/SpringConfig.java
│   │   │   ├── webapp/
│   │   │   │   ├── WEB-INF/
│   │   │   │   │   ├── views/
│   │   │   │   │   │   └── hello.jsp
│   │   │   │   │   └── web.xml
│   │   │   │   └── index.jsp
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
├── ear-module/
│   ├── src/
│   │   └── main/
│   │       └── application/
│   │           └── META-INF/
│   │               └── application.xml
│   └── pom.xml
└── pom.xml
2. 开发 EJB 模块
2.1 HelloWorldBean.java
创建一个无状态会话 Bean（Stateless Session Bean）。

java
Copy
package com.example.ejb;

import jakarta.ejb.Stateless;

@Stateless
public class HelloWorldBean {

    public String sayHello(String name) {
        return "Hello, " + name + "!";
    }
}
2.2 ejb-module/pom.xml
配置 EJB 模块的 Maven 依赖。

xml
Copy
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.example</groupId>
        <artifactId>ejb-springmvc-ear</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <artifactId>ejb-module</artifactId>
    <packaging>ejb</packaging>

    <dependencies>
        <!-- Jakarta EE API -->
        <dependency>
            <groupId>jakarta.platform</groupId>
            <artifactId>jakarta.jakartaee-api</artifactId>
            <version>9.1.0</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
</project>
Run HTML
3. 开发 Web 模块
3.1 HelloWorldController.java
创建一个 Spring MVC 控制器，调用 EJB。

java
Copy
package com.example.web.controller;

import com.example.ejb.HelloWorldBean;
import jakarta.ejb.EJB;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HelloWorldController {

    @EJB
    private HelloWorldBean helloWorldBean;

    @GetMapping("/hello")
    public ModelAndView sayHello(@RequestParam String name) {
        String message = helloWorldBean.sayHello(name);
        ModelAndView modelAndView = new ModelAndView("hello");
        modelAndView.addObject("message", message);
        return modelAndView;
    }
}
3.2 SpringConfig.java
配置 Spring MVC。

java
Copy
package com.example.web.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.example.web.controller")
public class SpringConfig implements WebMvcConfigurer {

    @Override
    public void configureViewResolvers(ViewResolverRegistry registry) {
        registry.jsp("/WEB-INF/views/", ".jsp");
    }
}
3.3 web.xml
配置 Spring MVC 和 EJB 查找。

xml
Copy
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                             http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <context-param>
        <param-name>contextClass</param-name>
        <param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>
    </context-param>

    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>com.example.web.config.SpringConfig</param-value>
    </context-param>

    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value></param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
Run HTML
3.4 hello.jsp
创建一个简单的 JSP 页面。

jsp
Copy
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Hello World</title>
</head>
<body>
    <h1>${message}</h1>
</body>
</html>
3.5 web-module/pom.xml
配置 Web 模块的 Maven 依赖。

xml
Copy
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.example</groupId>
        <artifactId>ejb-springmvc-ear</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <artifactId>web-module</artifactId>
    <packaging>war</packaging>

    <dependencies>
        <!-- Spring MVC -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.3.23</version>
        </dependency>
        <!-- EJB Module -->
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>ejb-module</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>
</project>
Run HTML
4. 打包 EAR 模块
4.1 application.xml
配置 EAR 模块的部署描述符。

xml
Copy
<application xmlns="http://xmlns.jcp.org/xml/ns/javaee"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                                 http://xmlns.jcp.org/xml/ns/javaee/application_8.xsd"
             version="8">
    <module>
        <ejb>ejb-module-1.0-SNAPSHOT.jar</ejb>
    </module>
    <module>
        <web>
            <web-uri>web-module-1.0-SNAPSHOT.war</web-uri>
            <context-root>/ejb-springmvc</context-root>
        </web>
    </module>
</application>
Run HTML
4.2 ear-module/pom.xml
配置 EAR 模块的 Maven 依赖。

xml
Copy
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.example</groupId>
        <artifactId>ejb-springmvc-ear</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <artifactId>ear-module</artifactId>
    <packaging>ear</packaging>

    <dependencies>
        <!-- EJB Module -->
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>ejb-module</artifactId>
            <version>1.0-SNAPSHOT</version>
            <type>ejb</type>
        </dependency>
        <!-- Web Module -->
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>web-module</artifactId>
            <version>1.0-SNAPSHOT</version>
            <type>war</type>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-ear-plugin</artifactId>
                <version>3.2.0</version>
                <configuration>
                    <version>8</version>
                    <defaultLibBundleDir>lib</defaultLibBundleDir>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
Run HTML
5. 父模块配置
5.1 pom.xml
配置父模块的 Maven 依赖。

xml
Copy
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>ejb-springmvc-ear</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>pom</packaging>

    <modules>
        <module>ejb-module</module>
        <module>web-module</module>
        <module>ear-module</module>
    </modules>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
</project>
Run HTML
6. 部署到 JBoss EAP 8
打包项目：

bash
Copy
mvn clean package
将生成的 ear-module/target/ear-module-1.0-SNAPSHOT.ear 文件部署到 JBoss EAP 8 的 standalone/deployments 目录。

访问应用：

Copy
http://localhost:8080/ejb-springmvc/hello?name=World
通过以上步骤，你可以成功开发并部署一个基于 EJB、Spring MVC 和 JSP 的应用程序。如果有任何问题或需要进一步的帮助，请随时告诉我！
