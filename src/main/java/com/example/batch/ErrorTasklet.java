package com.example.batch;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;

public class ErrorTasklet implements Tasklet {
    @Override
    public RepeatStatus execute(StepContribution stepContribution, ChunkContext chunkContext) throws Exception {
        if(chunkContext.getStepContext().getStepExecution().getExecutionContext().containsKey("test")){
            System.out.println("test finish");
            return RepeatStatus.FINISHED;
        }else{
            chunkContext.getStepContext().getStepExecution().getExecutionContext().put("test", true);
            System.out.println("test fail");
            throw new RuntimeException("fail");
        }


    }
}