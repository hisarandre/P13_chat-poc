package com.yourcaryourway.back.dto;

import com.yourcaryourway.back.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    private String sender;
    private String receiver;
    private MessageType type;
    private String content;
    private LocalDateTime timestamp;
}
