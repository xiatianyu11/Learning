package com.example.batch;


import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.StepExecutionListener;

public class MyTaskletListener implements StepExecutionListener {

    @Override
    public void beforeStep(StepExecution stepExecution) {
        System.out.println("🚀 Tasklet Step 开始执行: " + stepExecution.getStepName());
    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        System.out.println("✅ Tasklet Step 执行完成: " + stepExecution.getStepName());
        return stepExecution.getExitStatus();
    }


}