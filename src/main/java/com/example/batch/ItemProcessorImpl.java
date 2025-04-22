package com.example.batch;

import org.springframework.batch.item.ItemProcessor;

public class ItemProcessorImpl implements ItemProcessor<String, String> {
    @Override
    public String process(String item) {
        System.out.println("Processing: " + item);
        return item.toUpperCase();
    }
}
