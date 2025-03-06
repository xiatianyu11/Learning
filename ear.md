在 Eclipse 中使用 JBoss Tools 插件 开发和部署 EJB 应用并将其打包为 EAR 文件是一个非常方便的方式。以下是一个详细的教程，帮助你完成这个过程。

1. 环境准备
在开始之前，确保你已经安装并配置了以下工具：

Eclipse IDE：建议使用 Eclipse IDE for Enterprise Java Developers。

JDK：建议使用 JDK 8 或更高版本。

JBoss EAP/WildFly：下载并安装 JBoss EAP 或 WildFly。

JBoss Tools 插件：用于在 Eclipse 中支持 JBoss 开发。

2. 安装 JBoss Tools 插件
打开 Eclipse，选择 Help > Eclipse Marketplace。

在搜索框中输入 JBoss Tools，然后点击 Go。

找到 JBoss Tools，点击 Install。

按照提示完成安装，重启 Eclipse。

3. 配置 JBoss 服务器
在 Eclipse 中，选择 Window > Show View > Servers。

在 Servers 视图中，右键点击空白区域，选择 New > Server。

在服务器类型中选择 JBoss EAP 或 WildFly，然后点击 Next。

指定 JBoss 的安装目录，然后点击 Finish。

4. 创建 EJB 项目
我们将创建一个简单的 EJB 项目，包含一个无状态会话 Bean（Stateless Session Bean）。

4.1 创建 EJB 项目
在 Eclipse 中，选择 File > New > Other。

在弹出的窗口中，选择 EJB Project，然后点击 Next。

输入项目名称（例如 MyEJBProject），然后点击 Next。

在 Target runtime 中选择你刚刚配置的 JBoss 服务器。

点击 Finish 完成项目创建。

4.2 编写 EJB
在 src 目录下创建一个新的包（例如 com.example.ejb）。

在该包中创建一个新的类 MyStatelessBean.java：

java
Copy
package com.example.ejb;

import javax.ejb.Stateless;

@Stateless
public class MyStatelessBean {

    public String sayHello(String name) {
        return "Hello, " + name + "!";
    }
}
4.3 配置 ejb-jar.xml
在 src/META-INF 目录下创建一个新的文件 ejb-jar.xml。

添加以下内容：

xml
Copy
<ejb-jar xmlns="https://jakarta.ee/xml/ns/jakartaee"
         version="4.0"
         metadata-complete="true">
    <enterprise-beans>
        <session>
            <ejb-name>MyStatelessBean</ejb-name>
            <ejb-class>com.example.ejb.MyStatelessBean</ejb-class>
            <session-type>Stateless</session-type>
        </session>
    </enterprise-beans>
</ejb-jar>
Run HTML
5. 创建 EAR 项目
EAR 文件是一个企业级应用归档文件，可以包含 EJB 模块、Web 模块等。

5.1 创建 EAR 项目
在 Eclipse 中，选择 File > New > Other。

在弹出的窗口中，选择 Enterprise Application Project，然后点击 Next。

输入项目名称（例如 MyEARProject），然后点击 Next。

在 Target runtime 中选择你刚刚配置的 JBoss 服务器。

在 Project contents 中勾选 MyEJBProject，然后点击 Finish。

5.2 配置 application.xml
在 MyEARProject/src/META-INF 目录下找到 application.xml 文件。

添加以下内容：

xml
Copy
<application xmlns="https://jakarta.ee/xml/ns/jakartaee"
             version="9"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/application_9.xsd">
    <module>
        <ejb>MyEJBProject.jar</ejb>
    </module>
</application>
Run HTML
6. 使用 JBoss Tools 插件部署 EAR 文件
右键点击 MyEARProject，选择 Export > EAR file。

选择导出路径，然后点击 Finish。

在 Servers 视图中，右键点击你配置的 JBoss 服务器，选择 Add and Remove。

在弹出的窗口中，选择 MyEARProject，然后点击 Add。

点击 Finish，EAR 文件将被部署到 JBoss 服务器。

启动 JBoss 服务器，EAR 文件将自动部署。

7. 测试 EJB
你可以编写一个客户端或使用 JBoss 的管理控制台测试 EJB。例如，使用 JNDI 查找 EJB 并调用方法。

7.1 编写测试客户端
在 MyEJBProject 中创建一个新的类 Client.java：

java
Copy
package com.example.client;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import com.example.ejb.MyStatelessBean;

public class Client {

    public static void main(String[] args) {
        try {
            Context context = new InitialContext();
            MyStatelessBean bean = (MyStatelessBean) context.lookup("java:global/MyEARProject/MyEJBProject/MyStatelessBean!com.example.ejb.MyStatelessBean");
            System.out.println(bean.sayHello("World"));
        } catch (NamingException e) {
            e.printStackTrace();
        }
    }
}
运行 Client.java，你应该会看到输出 Hello, World!。

8. 参考文档
JBoss EAP Documentation

WildFly Documentation

Jakarta EE Tutorial

希望这个教程对你有帮助！如果有任何问题，欢迎随时提问！

This response is AI-generated, for reference only, and does not constitute professional advice.
