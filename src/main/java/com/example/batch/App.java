package com.example.batch;

import org.springframework.batch.core.*;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {
    public static void main(String[] args) throws Exception {
        ClassPathXmlApplicationContext context =
                new ClassPathXmlApplicationContext("batch-config.xml");

        JobLauncher jobLauncher = context.getBean(JobLauncher.class);
        Job job = context.getBean("updateUserJob", Job.class);

        JobParameters params = new JobParametersBuilder()
                .addLong("time", System.currentTimeMillis())
                .toJobParameters();

        JobExecution execution = jobLauncher.run(job, params);
        System.out.println("Job Status: " + execution.getStatus());
        context.close();
    }
}
