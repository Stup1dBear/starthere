CREATE TABLE stars (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    vision TEXT NOT NULL,
    why_it_matters TEXT NOT NULL,
    current_state TEXT NOT NULL,
    color VARCHAR(7) NOT NULL,
    created_at BIGINT NOT NULL,
    updated_at BIGINT NOT NULL,
    last_check_in_at BIGINT NULL,
    momentum VARCHAR(20) NOT NULL,
    energy INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    next_step TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_stars_user (user_id),
    INDEX idx_stars_status (status)
);

CREATE TABLE star_check_ins (
    id VARCHAR(36) PRIMARY KEY,
    star_id VARCHAR(36) NOT NULL,
    created_at BIGINT NOT NULL,
    mood VARCHAR(20) NOT NULL,
    signal VARCHAR(20) NOT NULL,
    update_text TEXT NOT NULL,
    blocker TEXT NULL,
    next_step TEXT NOT NULL,
    reply_title VARCHAR(255) NOT NULL,
    reply_message TEXT NOT NULL,
    reply_reflection TEXT NOT NULL,
    reply_next_step TEXT NOT NULL,
    FOREIGN KEY (star_id) REFERENCES stars(id) ON DELETE CASCADE,
    INDEX idx_star_check_ins_star (star_id),
    INDEX idx_star_check_ins_created_at (created_at)
);
