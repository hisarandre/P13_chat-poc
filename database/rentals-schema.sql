-- ============================================
-- SCRIPT SQL - RENTALS
-- ============================================

CREATE DATABASE IF NOT EXISTS rental_db;
USE rental_db;

-- AGENCY
CREATE TABLE agency (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID(), true)),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    street VARCHAR(255),
    zip_code VARCHAR(20),
    city VARCHAR(100),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- VEHICLE
CREATE TABLE vehicle (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID(), true)),
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    seats INT NOT NULL,
    doors INT NOT NULL,
    image_url VARCHAR(500),
    daily_rate DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    is_available BOOLEAN DEFAULT TRUE,
    acriss_code VARCHAR(10),
    acriss_category VARCHAR(50),
    type VARCHAR(50),
    transmission VARCHAR(20),
    drive VARCHAR(20),
    fuel VARCHAR(20),
    air_conditioning BOOLEAN DEFAULT FALSE,
    current_agency_id BINARY(16) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (current_agency_id) REFERENCES agency(id) ON DELETE CASCADE
);

-- RENTAL
CREATE TABLE rental (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID(), true)),
    user_id BINARY(16) NOT NULL,
    pickup_datetime DATETIME NOT NULL,
    return_datetime DATETIME NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    cancelled_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    pickup_agency_id BINARY(16) NOT NULL,
    return_agency_id BINARY(16) NOT NULL,
    vehicle_id BINARY(16) NOT NULL,
    FOREIGN KEY (pickup_agency_id) REFERENCES agency(id),
    FOREIGN KEY (return_agency_id) REFERENCES agency(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(id)
);

-- PAYMENT
CREATE TABLE payment (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID(), true)),
    rental_id BINARY(16) NOT NULL,
    stripe_payment_intent_id VARCHAR(255),
    stripe_charge_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    payment_status ENUM('PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELLED') DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    receipt_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    processed_at TIMESTAMP NULL,
    FOREIGN KEY (rental_id) REFERENCES rental(id) ON DELETE CASCADE
);

-- REFUND
CREATE TABLE refund (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID(), true)),
    payment_id BINARY(16) NOT NULL,
    stripe_payment_intent_id VARCHAR(255),
    stripe_refund_id VARCHAR(255),
    refund_amount DECIMAL(10,2) NOT NULL,
    refund_reason TEXT,
    currency VARCHAR(10) DEFAULT 'USD',
    refund_status ENUM('PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED') DEFAULT 'PENDING',
    refund_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    refunded_at TIMESTAMP NULL,
    FOREIGN KEY (payment_id) REFERENCES payment(id) ON DELETE CASCADE
);