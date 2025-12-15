-- ============================================
-- SCRIPT SQL - USERS
-- ============================================

CREATE DATABASE IF NOT EXISTS user_db;
USE user_db;

CREATE TABLE user (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID(), true)),
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    email VARCHAR(255) NOT NULL UNIQUE,
    street VARCHAR(255),
    country VARCHAR(100),
    city VARCHAR(100),
    zip_code VARCHAR(20),
    prefered_language VARCHAR(10) DEFAULT 'en',
    prefered_currency VARCHAR(10) DEFAULT 'USD',
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

CREATE TABLE employee (
    user_id BINARY(16) PRIMARY KEY,
    role ENUM('AGENT', 'ADMIN'),
    current_chats INT DEFAULT 0,
    max_current_chats INT DEFAULT 5,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE client (
    user_id BINARY(16) PRIMARY KEY,
    driving_licence_number VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);