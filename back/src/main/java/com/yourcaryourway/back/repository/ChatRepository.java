package com.yourcaryourway.back.repository;

import com.yourcaryourway.back.dto.ChatMessage;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ChatRepository {
    private final List<ChatMessage> messages = new ArrayList<>();

    public void save(ChatMessage message) {
        messages.add(message);
    }

    public List<ChatMessage> findAll() {
        return new ArrayList<>(messages);
    }
}
