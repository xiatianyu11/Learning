package com.example.batch;


import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.jdbc.core.JdbcTemplate;

public class UpdateStatusTasklet1 implements Tasklet {

    private JdbcTemplate jdbcTemplate;

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) {
        String sql = "UPDATE users SET status = 'PROCESSED' WHERE status = 'NEW' and id=2";
        int updated = jdbcTemplate.update(sql);

        System.out.println("Updated rows: " + updated);
        if(true)
            throw new RuntimeException("ee");
        return RepeatStatus.FINISHED;
    }
}