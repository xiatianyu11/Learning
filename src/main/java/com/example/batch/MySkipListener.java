package com.example.batch;

import org.springframework.batch.core.SkipListener;

public class MySkipListener implements SkipListener<Object, Object> {
    @Override
    public void onSkipInRead(Throwable t) {
        System.out.println("跳过读取异常: " + t.getMessage());
    }
    @Override
    public void onSkipInWrite(Object item, Throwable t) {
        System.out.println("跳过写入异常: " + t.getMessage());
    }

    @Override
    public void onSkipInProcess(Object o, Throwable throwable) {

    }
}