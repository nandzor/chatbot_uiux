--
-- Enhanced PostgreSQL 15 Database Schema for Chatbot AI + Human Multi-tenant SAAS
-- Optimized for performance, security, and scalability
--

-- Drop existing objects if they exist (for clean installation)
DROP SCHEMA IF EXISTS chatbot CASCADE;
CREATE SCHEMA chatbot;
SET search_path TO chatbot, public;

-- Enable required extensions for PostgreSQL 15
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";
CREATE EXTENSION IF NOT EXISTS "btree_gist";
-- Note: Uncomment if pg_stat_statements is available
-- CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Create ENUMs
CREATE TYPE status_type AS ENUM (
    'active',
    'inactive',
    'suspended',
    'deleted',
    'pending',
    'draft'
);

CREATE TYPE user_role AS ENUM (
    'super_admin',
    'org_admin',
    'agent',
    'customer',
    'viewer',
    'moderator',
    'developer'
);

CREATE TYPE channel_type AS ENUM (
    'whatsapp',
    'wordpress_sdk',
    'telegram',
    'webchat',
    'api',
    'facebook',
    'instagram',
    'line',
    'slack',
    'discord',
    'teams',
    'viber',
    'wechat'
);

CREATE TYPE language_type AS ENUM (
    'indonesia',
    'english',
    'javanese',
    'sundanese',
    'balinese',
    'minang',
    'chinese',
    'japanese',
    'korean',
    'spanish',
    'french',
    'german',
    'arabic',
    'thai',
    'vietnamese'
);

CREATE TYPE subscription_tier AS ENUM (
    'trial',
    'starter',
    'professional',
    'enterprise',
    'custom'
);

CREATE TYPE payment_status AS ENUM (
    'pending',
    'processing',
    'success',
    'failed',
    'expired',
    'refunded',
    'cancelled',
    'disputed'
);

CREATE TYPE billing_cycle AS ENUM (
    'monthly',
    'quarterly',
    'yearly',
    'lifetime'
);

CREATE TYPE audit_action AS ENUM (
    'create',
    'update',
    'delete',
    'login',
    'logout',
    'export',
    'import',
    'view',
    'download',
    'api_call',
    'payment',
    'subscription_change'
);

CREATE TYPE objective_level AS ENUM (
    'basic',
    'intermediate',
    'advanced',
    'expert'
);

CREATE TYPE message_type AS ENUM (
    'text',
    'image',
    'audio',
    'video',
    'file',
    'location',
    'contact',
    'sticker',
    'template',
    'quick_reply',
    'button',
    'list',
    'carousel',
    'poll',
    'form'
);

CREATE TYPE ai_model_type AS ENUM (
    'gpt-3.5-turbo',
    'gpt-4',
    'gpt-4-turbo',
    'claude-3-sonnet',
    'claude-3-opus',
    'gemini-pro',
    'custom'
);

CREATE TYPE quota_type AS ENUM (
    'messages',
    'api_calls',
    'storage',
    'agents',
    'channels',
    'knowledge_articles',
    'ai_requests'
);

-- Subscription Plans table
CREATE TABLE subscription_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    description TEXT,
    tier subscription_tier NOT NULL,
    
    -- Pricing
    price_monthly DECIMAL(10,2) DEFAULT 0,
    price_quarterly DECIMAL(10,2) DEFAULT 0,
    price_yearly DECIMAL(10,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'IDR',
    
    -- Features & Limits
    max_agents INTEGER DEFAULT 1,
    max_channels INTEGER DEFAULT 1,
    max_knowledge_articles INTEGER DEFAULT 100,
    max_monthly_messages INTEGER DEFAULT 1000,
    max_monthly_ai_requests INTEGER DEFAULT 100,
    max_storage_gb INTEGER DEFAULT 1,
    max_api_calls_per_day INTEGER DEFAULT 1000,
    
    -- Feature Flags
    features JSONB DEFAULT '{
        "ai_assistant": false,
        "sentiment_analysis": false,
        "auto_translation": false,
        "advanced_analytics": false,
        "custom_branding": false,
        "api_access": false,
        "priority_support": false,
        "sso": false,
        "webhook": false,
        "custom_integrations": false
    }',
    
    -- Plan Configuration
    trial_days INTEGER DEFAULT 14,
    is_popular BOOLEAN DEFAULT FALSE,
    is_custom BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    
    -- System fields
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Organizations table (Enhanced)
CREATE TABLE organizations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    org_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    logo_url VARCHAR(500),
    favicon_url VARCHAR(500),
    website VARCHAR(255),
    tax_id VARCHAR(50),
    business_type VARCHAR(100),
    industry VARCHAR(100),
    company_size VARCHAR(50),
    timezone VARCHAR(100) DEFAULT 'Asia/Jakarta',
    locale VARCHAR(10) DEFAULT 'id',
    currency VARCHAR(3) DEFAULT 'IDR',
    
    -- Subscription & Billing
    subscription_plan_id UUID REFERENCES subscription_plans(id),
    subscription_status VARCHAR(20) DEFAULT 'trial',
    trial_ends_at TIMESTAMPTZ,
    subscription_starts_at TIMESTAMPTZ,
    subscription_ends_at TIMESTAMPTZ,
    billing_cycle billing_cycle DEFAULT 'monthly',
    
    -- Usage Tracking
    current_usage JSONB DEFAULT '{
        "messages": 0,
        "ai_requests": 0,
        "api_calls": 0,
        "storage_mb": 0,
        "active_agents": 0,
        "active_channels": 0
    }',
    
    -- UI/UX Configuration
    theme_config JSONB DEFAULT '{"primaryColor": "#3B82F6", "secondaryColor": "#10B981", "darkMode": false}',
    branding_config JSONB DEFAULT '{}',
    feature_flags JSONB DEFAULT '{}',
    ui_preferences JSONB DEFAULT '{}',
    
    -- Business Configuration
    business_hours JSONB DEFAULT '{"timezone": "Asia/Jakarta", "days": {}}',
    contact_info JSONB DEFAULT '{}',
    social_media JSONB DEFAULT '{}',
    
    -- Security Settings
    security_settings JSONB DEFAULT '{
        "password_policy": {"min_length": 8, "require_special": true},
        "session_timeout": 3600,
        "ip_whitelist": [],
        "two_factor_required": false
    }',
    
    -- API Configuration
    api_enabled BOOLEAN DEFAULT FALSE,
    webhook_url VARCHAR(500),
    webhook_secret VARCHAR(255),
    
    -- System fields
    settings JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);

-- Users table (Enhanced)
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    role user_role DEFAULT 'customer' NOT NULL,
    
    -- Authentication & Security
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    backup_codes TEXT[],
    last_login_at TIMESTAMPTZ,
    last_login_ip INET,
    login_count INTEGER DEFAULT 0,
    failed_login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMPTZ,
    password_changed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    -- Session Management
    active_sessions JSONB DEFAULT '[]',
    max_concurrent_sessions INTEGER DEFAULT 3,
    
    -- UI/UX Preferences
    ui_preferences JSONB DEFAULT '{"theme": "light", "language": "id", "timezone": "Asia/Jakarta", "notifications": {"email": true, "push": true}}',
    dashboard_config JSONB DEFAULT '{}',
    notification_preferences JSONB DEFAULT '{}',
    
    -- Profile & Activity
    bio TEXT,
    location VARCHAR(255),
    department VARCHAR(100),
    job_title VARCHAR(100),
    skills TEXT[],
    languages language_type[] DEFAULT ARRAY['indonesia']::language_type[],
    
    -- API Access
    api_access_enabled BOOLEAN DEFAULT FALSE,
    api_rate_limit INTEGER DEFAULT 100,
    
    -- System fields
    permissions JSONB DEFAULT '{}',
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ
);

-- API Keys table
CREATE TABLE api_keys (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_hash VARCHAR(255) NOT NULL UNIQUE,
    key_prefix VARCHAR(20) NOT NULL,
    
    -- Permissions & Scope
    scopes TEXT[] DEFAULT ARRAY['read'],
    permissions JSONB DEFAULT '{}',
    rate_limit_per_minute INTEGER DEFAULT 60,
    rate_limit_per_hour INTEGER DEFAULT 1000,
    rate_limit_per_day INTEGER DEFAULT 10000,
    
    -- Usage Tracking
    last_used_at TIMESTAMPTZ,
    total_requests INTEGER DEFAULT 0,
    
    -- Expiration & Security
    expires_at TIMESTAMPTZ,
    allowed_ips TEXT[],
    user_agent_restrictions TEXT[],
    
    -- System fields
    status status_type DEFAULT 'active',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions table
CREATE TABLE subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    
    -- Subscription Details
    status payment_status DEFAULT 'pending',
    billing_cycle billing_cycle DEFAULT 'monthly',
    current_period_start TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    current_period_end TIMESTAMPTZ,
    trial_start TIMESTAMPTZ,
    trial_end TIMESTAMPTZ,
    
    -- Pricing
    unit_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'IDR',
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    
    -- Payment Information
    payment_method_id VARCHAR(255),
    last_payment_date TIMESTAMPTZ,
    next_payment_date TIMESTAMPTZ,
    
    -- Cancellation
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    canceled_at TIMESTAMPTZ,
    cancellation_reason TEXT,
    
    -- System fields
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Billing Invoices table
CREATE TABLE billing_invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(id),
    
    -- Invoice Details
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    status payment_status DEFAULT 'pending',
    
    -- Amounts
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'IDR',
    
    -- Dates
    invoice_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMPTZ,
    paid_date TIMESTAMPTZ,
    
    -- Payment Information
    payment_method VARCHAR(100),
    transaction_id VARCHAR(255),
    payment_gateway VARCHAR(50),
    
    -- Invoice Data
    line_items JSONB DEFAULT '[]',
    billing_address JSONB DEFAULT '{}',
    
    -- System fields
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Usage Tracking table
CREATE TABLE usage_tracking (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    quota_type quota_type NOT NULL,
    
    -- Usage Data
    used_amount INTEGER DEFAULT 0,
    quota_limit INTEGER DEFAULT 0,
    overage_amount INTEGER DEFAULT 0,
    
    -- Billing
    unit_cost DECIMAL(10,4) DEFAULT 0,
    total_cost DECIMAL(10,2) DEFAULT 0,
    
    -- System fields
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(organization_id, date, quota_type)
);

-- User Sessions table
CREATE TABLE user_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    
    -- Session Details
    ip_address INET,
    user_agent TEXT,
    device_info JSONB DEFAULT '{}',
    location_info JSONB DEFAULT '{}',
    
    -- Security
    is_active BOOLEAN DEFAULT TRUE,
    last_activity_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    -- System fields
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ NOT NULL
);

-- AI Models Configuration table
CREATE TABLE ai_models (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    model_type ai_model_type NOT NULL,
    
    -- Configuration
    api_endpoint VARCHAR(500),
    api_key_encrypted TEXT,
    model_version VARCHAR(50),
    
    -- Parameters
    temperature DECIMAL(3,2) DEFAULT 0.7,
    max_tokens INTEGER DEFAULT 150,
    top_p DECIMAL(3,2) DEFAULT 1.0,
    frequency_penalty DECIMAL(3,2) DEFAULT 0.0,
    presence_penalty DECIMAL(3,2) DEFAULT 0.0,
    
    -- System Prompts
    system_prompt TEXT,
    context_prompt TEXT,
    fallback_responses TEXT[],
    
    -- Usage & Performance
    total_requests INTEGER DEFAULT 0,
    avg_response_time INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2) DEFAULT 0,
    cost_per_request DECIMAL(10,6) DEFAULT 0,
    
    -- System fields
    is_default BOOLEAN DEFAULT FALSE,
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Knowledge Categories table
CREATE TABLE knowledge_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES knowledge_categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    color VARCHAR(7),
    order_index INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    
    -- SEO & Frontend
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT[],
    
    -- Content Management
    content_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    
    -- AI Training
    is_ai_trainable BOOLEAN DEFAULT TRUE,
    ai_category_embeddings JSONB DEFAULT '{}', -- For embeddings (JSON format)
    
    -- System fields
    metadata JSONB DEFAULT '{}',
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(organization_id, slug)
);

-- Knowledge Articles table (Enhanced)
CREATE TABLE knowledge_articles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES knowledge_categories(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    excerpt TEXT,
    
    -- Q&A Enhancement
    article_type VARCHAR(20) DEFAULT 'article' CHECK (article_type IN ('article', 'qa', 'faq')),
    question TEXT,
    answer TEXT,
    keywords TEXT[],
    related_questions TEXT[],
    
    -- Content Management
    tags TEXT[],
    language language_type DEFAULT 'indonesia',
    difficulty_level objective_level DEFAULT 'basic',
    estimated_read_time INTEGER,
    
    -- SEO & Frontend
    meta_title VARCHAR(255),
    meta_description TEXT,
    featured_image_url VARCHAR(500),
    
    -- Analytics & Engagement
    view_count INTEGER DEFAULT 0,
    helpful_count INTEGER DEFAULT 0,
    not_helpful_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    
    -- Publishing & Visibility
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    is_searchable BOOLEAN DEFAULT TRUE,
    is_ai_trainable BOOLEAN DEFAULT TRUE,
    
    -- Author & Editorial
    author_id UUID REFERENCES users(id),
    reviewer_id UUID REFERENCES users(id),
    published_at TIMESTAMPTZ,
    last_reviewed_at TIMESTAMPTZ,
    
    -- AI & Search Enhancement
    embeddings_data JSONB DEFAULT '{}',
    embeddings_vector JSONB DEFAULT '{}', -- OpenAI embeddings (JSON format)
    search_vector TSVECTOR,
    ai_generated BOOLEAN DEFAULT FALSE,
    confidence_score NUMERIC(3,2),
    
    -- Version Control
    version INTEGER DEFAULT 1,
    previous_version_id UUID REFERENCES knowledge_articles(id),
    
    -- System fields
    metadata JSONB DEFAULT '{}',
    status status_type DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(organization_id, slug)
);

-- Bot Personalities table (Enhanced)
CREATE TABLE bot_personalities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    display_name VARCHAR(255),
    description TEXT,
    
    -- AI Model Configuration
    ai_model_id UUID REFERENCES ai_models(id),
    
    -- Language & Communication
    language language_type NOT NULL,
    tone VARCHAR(50),
    communication_style VARCHAR(50),
    formality_level VARCHAR(20) DEFAULT 'formal',
    
    -- UI Customization
    avatar_url VARCHAR(500),
    color_scheme JSONB DEFAULT '{"primary": "#3B82F6", "secondary": "#10B981"}',
    
    -- Messages & Responses
    greeting_message TEXT,
    farewell_message TEXT,
    error_message TEXT,
    waiting_message TEXT,
    transfer_message TEXT,
    fallback_message TEXT,
    
    -- AI Configuration
    system_message TEXT,
    personality_traits JSONB DEFAULT '{}',
    custom_vocabulary JSONB DEFAULT '{}',
    response_templates JSONB DEFAULT '{}',
    conversation_starters TEXT[],
    
    -- Behavior Settings
    response_delay_ms INTEGER DEFAULT 1000,
    typing_indicator BOOLEAN DEFAULT TRUE,
    max_response_length INTEGER DEFAULT 1000,
    enable_small_talk BOOLEAN DEFAULT TRUE,
    confidence_threshold DECIMAL(3,2) DEFAULT 0.7,
    
    -- Learning & Training
    learning_enabled BOOLEAN DEFAULT TRUE,
    training_data_sources TEXT[],
    last_trained_at TIMESTAMPTZ,
    
    -- Performance Metrics
    total_conversations INTEGER DEFAULT 0,
    avg_satisfaction_score DECIMAL(3,2) DEFAULT 0,
    success_rate DECIMAL(5,2) DEFAULT 0,
    
    -- System fields
    is_default BOOLEAN DEFAULT FALSE,
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(organization_id, code)
);

-- Channel Configs table (Enhanced)
CREATE TABLE channel_configs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    channel channel_type NOT NULL,
    channel_identifier VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    description TEXT,
    
    -- Bot Configuration
    personality_id UUID REFERENCES bot_personalities(id),
    
    -- Connection Settings
    webhook_url VARCHAR(500),
    api_key_encrypted TEXT,
    api_secret_encrypted TEXT,
    access_token_encrypted TEXT,
    refresh_token_encrypted TEXT,
    token_expires_at TIMESTAMPTZ,
    
    -- Channel-specific Settings
    settings JSONB DEFAULT '{}',
    rate_limits JSONB DEFAULT '{"messages_per_minute": 60, "messages_per_hour": 1000}',
    
    -- UI Configuration
    widget_config JSONB DEFAULT '{}',
    theme_config JSONB DEFAULT '{}',
    
    -- Features & Capabilities
    supported_message_types message_type[] DEFAULT ARRAY['text']::message_type[],
    features JSONB DEFAULT '{"typing_indicator": true, "read_receipts": true, "file_upload": false}',
    
    -- Status & Health
    is_active BOOLEAN DEFAULT TRUE,
    health_status VARCHAR(20) DEFAULT 'unknown',
    last_connected_at TIMESTAMPTZ,
    last_error TEXT,
    connection_attempts INTEGER DEFAULT 0,
    
    -- Analytics
    total_messages_sent INTEGER DEFAULT 0,
    total_messages_received INTEGER DEFAULT 0,
    uptime_percentage DECIMAL(5,2) DEFAULT 100,
    
    -- System fields
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(organization_id, channel, channel_identifier)
);

-- Customers table (Enhanced)
CREATE TABLE customers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    external_id VARCHAR(255),
    
    -- Basic Information
    name VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    
    -- Channel Information
    channel channel_type NOT NULL,
    channel_user_id VARCHAR(255) NOT NULL,
    
    -- Profile & Preferences
    avatar_url VARCHAR(500),
    language language_type DEFAULT 'indonesia',
    timezone VARCHAR(100) DEFAULT 'Asia/Jakarta',
    profile_data JSONB DEFAULT '{}',
    preferences JSONB DEFAULT '{}',
    
    -- Segmentation & Marketing
    tags TEXT[],
    segments TEXT[],
    source VARCHAR(100),
    utm_data JSONB DEFAULT '{}',
    
    -- Interaction History
    last_interaction_at TIMESTAMPTZ,
    total_interactions INTEGER DEFAULT 0,
    total_messages INTEGER DEFAULT 0,
    avg_response_time INTEGER,
    satisfaction_score NUMERIC(3,2),
    
    -- Behavioral Data
    interaction_patterns JSONB DEFAULT '{}',
    interests TEXT[],
    purchase_history JSONB DEFAULT '[]',
    
    -- AI Insights
    sentiment_history JSONB DEFAULT '[]',
    intent_patterns JSONB DEFAULT '{}',
    engagement_score DECIMAL(3,2) DEFAULT 0,
    
    -- System fields
    notes TEXT,
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(organization_id, channel, channel_user_id)
);

-- Agents table (Enhanced)
CREATE TABLE agents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    agent_code VARCHAR(50) UNIQUE NOT NULL,
    
    -- Profile Information
    display_name VARCHAR(255),
    department VARCHAR(100),
    job_title VARCHAR(100),
    specialization TEXT[],
    bio TEXT,
    
    -- Capacity & Availability
    max_concurrent_chats INTEGER DEFAULT 5,
    current_active_chats INTEGER DEFAULT 0,
    availability_status VARCHAR(20) DEFAULT 'offline',
    auto_accept_chats BOOLEAN DEFAULT FALSE,
    
    -- Working Schedule
    working_hours JSONB DEFAULT '{}',
    breaks JSONB DEFAULT '[]',
    time_off JSONB DEFAULT '[]',
    
    -- Skills & Languages
    skills TEXT[],
    languages language_type[] DEFAULT ARRAY['indonesia']::language_type[],
    expertise_areas TEXT[],
    certifications TEXT[],
    
    -- Performance Metrics
    performance_metrics JSONB DEFAULT '{"response_time": 0, "resolution_rate": 0, "satisfaction": 0}',
    rating NUMERIC(3,2) DEFAULT 0.00,
    total_handled_chats INTEGER DEFAULT 0,
    total_resolved_chats INTEGER DEFAULT 0,
    avg_response_time INTEGER,
    avg_resolution_time INTEGER,
    
    -- AI Assistance
    ai_suggestions_enabled BOOLEAN DEFAULT TRUE,
    ai_auto_responses_enabled BOOLEAN DEFAULT FALSE,
    
    -- Gamification & Motivation
    points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    badges TEXT[],
    achievements JSONB DEFAULT '[]',
    
    -- System fields
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Chat Sessions table (Enhanced with partitioning support)
CREATE TABLE chat_sessions (
    id UUID DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    channel_config_id UUID NOT NULL REFERENCES channel_configs(id),
    agent_id UUID REFERENCES agents(id),
    
    -- Session Information
    session_token VARCHAR(255) UNIQUE NOT NULL,
    session_type VARCHAR(20) DEFAULT 'customer_initiated',
    
    -- Timing
    started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMPTZ,
    last_activity_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    first_response_at TIMESTAMPTZ,
    
    -- Status & Flow
    is_active BOOLEAN DEFAULT TRUE,
    is_bot_session BOOLEAN DEFAULT TRUE,
    handover_reason TEXT,
    handover_at TIMESTAMPTZ,
    
    -- Analytics & Metrics
    total_messages INTEGER DEFAULT 0,
    customer_messages INTEGER DEFAULT 0,
    bot_messages INTEGER DEFAULT 0,
    agent_messages INTEGER DEFAULT 0,
    response_time_avg INTEGER,
    resolution_time INTEGER,
    wait_time INTEGER,
    
    -- Quality & Feedback
    satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
    feedback_text TEXT,
    feedback_tags TEXT[],
    csat_submitted_at TIMESTAMPTZ,
    
    -- Categorization
    intent VARCHAR(100),
    category VARCHAR(100),
    subcategory VARCHAR(100),
    priority VARCHAR(20) DEFAULT 'normal',
    tags TEXT[],
    
    -- Resolution
    is_resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMPTZ,
    resolution_type VARCHAR(50),
    resolution_notes TEXT,
    
    -- AI Analytics
    sentiment_analysis JSONB DEFAULT '{}',
    ai_summary TEXT,
    topics_discussed TEXT[],
    
    -- System fields
    session_data JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create partitions for chat_sessions (monthly partitions)
CREATE TABLE chat_sessions_2024_01 PARTITION OF chat_sessions
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
CREATE TABLE chat_sessions_2024_02 PARTITION OF chat_sessions
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
CREATE TABLE chat_sessions_2024_03 PARTITION OF chat_sessions
    FOR VALUES FROM ('2024-03-01') TO ('2024-04-01');
CREATE TABLE chat_sessions_2024_04 PARTITION OF chat_sessions
    FOR VALUES FROM ('2024-04-01') TO ('2024-05-01');
CREATE TABLE chat_sessions_2024_05 PARTITION OF chat_sessions
    FOR VALUES FROM ('2024-05-01') TO ('2024-06-01');
CREATE TABLE chat_sessions_2024_06 PARTITION OF chat_sessions
    FOR VALUES FROM ('2024-06-01') TO ('2024-07-01');
CREATE TABLE chat_sessions_2024_07 PARTITION OF chat_sessions
    FOR VALUES FROM ('2024-07-01') TO ('2024-08-01');
CREATE TABLE chat_sessions_2024_08 PARTITION OF chat_sessions
    FOR VALUES FROM ('2024-08-01') TO ('2024-09-01');
CREATE TABLE chat_sessions_2024_09 PARTITION OF chat_sessions
    FOR VALUES FROM ('2024-09-01') TO ('2024-10-01');
CREATE TABLE chat_sessions_2024_10 PARTITION OF chat_sessions
    FOR VALUES FROM ('2024-10-01') TO ('2024-11-01');
CREATE TABLE chat_sessions_2024_11 PARTITION OF chat_sessions
    FOR VALUES FROM ('2024-11-01') TO ('2024-12-01');
CREATE TABLE chat_sessions_2024_12 PARTITION OF chat_sessions
    FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');

-- Messages table (Enhanced with partitioning)
CREATE TABLE messages (
    id UUID DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL, -- Reference to chat_sessions
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Sender Information
    sender_type VARCHAR(20) NOT NULL CHECK (sender_type IN ('customer', 'bot', 'agent', 'system')),
    sender_id UUID,
    sender_name VARCHAR(255),
    
    -- Message Content
    message_text TEXT,
    message_type message_type DEFAULT 'text',
    
    -- Rich Media
    media_url VARCHAR(500),
    media_type VARCHAR(50),
    media_size INTEGER,
    media_metadata JSONB DEFAULT '{}',
    thumbnail_url VARCHAR(500),
    
    -- Interactive Elements
    quick_replies JSONB,
    buttons JSONB,
    template_data JSONB,
    
    -- AI & Intent
    intent VARCHAR(100),
    entities JSONB DEFAULT '{}',
    confidence_score NUMERIC(3,2),
    ai_generated BOOLEAN DEFAULT FALSE,
    ai_model_used VARCHAR(100),
    
    -- Sentiment Analysis
    sentiment_score DECIMAL(3,2),
    sentiment_label VARCHAR(20),
    emotion_scores JSONB DEFAULT '{}',
    
    -- Status & Delivery
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    failed_at TIMESTAMPTZ,
    failed_reason TEXT,
    
    -- Threading & Context
    reply_to_message_id UUID, -- Self-reference
    thread_id UUID,
    context JSONB DEFAULT '{}',
    
    -- Performance
    processing_time_ms INTEGER,
    
    -- System fields
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create partitions for messages (monthly partitions)
CREATE TABLE messages_2024_01 PARTITION OF messages
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
CREATE TABLE messages_2024_02 PARTITION OF messages
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
CREATE TABLE messages_2024_03 PARTITION OF messages
    FOR VALUES FROM ('2024-03-01') TO ('2024-04-01');
CREATE TABLE messages_2024_04 PARTITION OF messages
    FOR VALUES FROM ('2024-04-01') TO ('2024-05-01');
CREATE TABLE messages_2024_05 PARTITION OF messages
    FOR VALUES FROM ('2024-05-01') TO ('2024-06-01');
CREATE TABLE messages_2024_06 PARTITION OF messages
    FOR VALUES FROM ('2024-06-01') TO ('2024-07-01');
CREATE TABLE messages_2024_07 PARTITION OF messages
    FOR VALUES FROM ('2024-07-01') TO ('2024-08-01');
CREATE TABLE messages_2024_08 PARTITION OF messages
    FOR VALUES FROM ('2024-08-01') TO ('2024-09-01');
CREATE TABLE messages_2024_09 PARTITION OF messages
    FOR VALUES FROM ('2024-09-01') TO ('2024-10-01');
CREATE TABLE messages_2024_10 PARTITION OF messages
    FOR VALUES FROM ('2024-10-01') TO ('2024-11-01');
CREATE TABLE messages_2024_11 PARTITION OF messages
    FOR VALUES FROM ('2024-11-01') TO ('2024-12-01');
CREATE TABLE messages_2024_12 PARTITION OF messages
    FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');

-- AI Training Data table
CREATE TABLE ai_training_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    source_type VARCHAR(50) NOT NULL, -- 'conversation', 'knowledge_article', 'manual'
    source_id UUID,
    
    -- Training Content
    input_text TEXT NOT NULL,
    expected_output TEXT,
    context TEXT,
    intent VARCHAR(100),
    entities JSONB DEFAULT '{}',
    
    -- Quality & Validation
    is_validated BOOLEAN DEFAULT FALSE,
    validation_score DECIMAL(3,2),
    human_reviewed BOOLEAN DEFAULT FALSE,
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMPTZ,
    
    -- Training Metadata
    language language_type DEFAULT 'indonesia',
    difficulty_level objective_level DEFAULT 'basic',
    training_tags TEXT[],
    
    -- System fields
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- AI Conversations Log table
CREATE TABLE ai_conversations_log (
    id UUID DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    session_id UUID,
    message_id UUID,
    
    -- AI Request Details
    ai_model_id UUID REFERENCES ai_models(id),
    prompt TEXT NOT NULL,
    response TEXT,
    
    -- Performance Metrics
    response_time_ms INTEGER,
    token_count_input INTEGER,
    token_count_output INTEGER,
    cost_usd DECIMAL(10,6),
    
    -- Quality Metrics
    confidence_score DECIMAL(3,2),
    user_feedback INTEGER CHECK (user_feedback >= -1 AND user_feedback <= 1), -- -1: negative, 0: neutral, 1: positive
    
    -- Error Handling
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    
    -- System fields
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create partitions for ai_conversations_log (monthly)
CREATE TABLE ai_conversations_log_2024_01 PARTITION OF ai_conversations_log
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
CREATE TABLE ai_conversations_log_2024_02 PARTITION OF ai_conversations_log
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
CREATE TABLE ai_conversations_log_2024_03 PARTITION OF ai_conversations_log
    FOR VALUES FROM ('2024-03-01') TO ('2024-04-01');

-- Audit Logs table (Enhanced)
CREATE TABLE audit_logs (
    id UUID DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Action Details
    action audit_action NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID,
    resource_name VARCHAR(255),
    
    -- Change Details
    old_values JSONB,
    new_values JSONB,
    changes JSONB,
    
    -- Request Context
    ip_address INET,
    user_agent TEXT,
    api_key_id UUID REFERENCES api_keys(id),
    session_id VARCHAR(255),
    
    -- Additional Context
    description TEXT,
    severity VARCHAR(20) DEFAULT 'info',
    
    -- System fields
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create partitions for audit_logs (monthly)
CREATE TABLE audit_logs_2024_01 PARTITION OF audit_logs
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
CREATE TABLE audit_logs_2024_02 PARTITION OF audit_logs
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
CREATE TABLE audit_logs_2024_03 PARTITION OF audit_logs
    FOR VALUES FROM ('2024-03-01') TO ('2024-04-01');

-- API Rate Limiting table
CREATE TABLE api_rate_limits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    api_key_id UUID REFERENCES api_keys(id) ON DELETE CASCADE,
    ip_address INET,
    
    -- Rate Limiting
    endpoint VARCHAR(255),
    method VARCHAR(10),
    requests_count INTEGER DEFAULT 1,
    window_start TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    window_duration_seconds INTEGER DEFAULT 60,
    
    -- System fields
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Analytics Daily table (Enhanced)
CREATE TABLE analytics_daily (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    
    -- Session Metrics
    total_sessions INTEGER DEFAULT 0,
    bot_sessions INTEGER DEFAULT 0,
    agent_sessions INTEGER DEFAULT 0,
    handover_count INTEGER DEFAULT 0,
    
    -- Message Metrics
    total_messages INTEGER DEFAULT 0,
    customer_messages INTEGER DEFAULT 0,
    bot_messages INTEGER DEFAULT 0,
    agent_messages INTEGER DEFAULT 0,
    
    -- User Metrics
    unique_customers INTEGER DEFAULT 0,
    new_customers INTEGER DEFAULT 0,
    returning_customers INTEGER DEFAULT 0,
    active_agents INTEGER DEFAULT 0,
    
    -- Performance Metrics
    avg_session_duration INTEGER,
    avg_response_time INTEGER,
    avg_resolution_time INTEGER,
    avg_wait_time INTEGER,
    first_response_time INTEGER,
    
    -- Quality Metrics
    satisfaction_avg NUMERIC(3,2),
    satisfaction_count INTEGER DEFAULT 0,
    resolution_rate NUMERIC(5,2),
    escalation_rate NUMERIC(5,2),
    
    -- AI Metrics
    ai_requests_count INTEGER DEFAULT 0,
    ai_success_rate NUMERIC(5,2),
    ai_avg_confidence NUMERIC(3,2),
    ai_cost_usd DECIMAL(10,2) DEFAULT 0,
    
    -- Channel Breakdown
    channel_breakdown JSONB DEFAULT '{}',
    
    -- Popular Content
    top_intents JSONB DEFAULT '[]',
    top_articles JSONB DEFAULT '[]',
    top_searches JSONB DEFAULT '[]',
    
    -- Agent Performance
    agent_performance JSONB DEFAULT '{}',
    
    -- Time Analysis
    peak_hours JSONB DEFAULT '{}',
    hourly_distribution JSONB DEFAULT '{}',
    
    -- Error & Issues
    error_count INTEGER DEFAULT 0,
    bot_fallback_count INTEGER DEFAULT 0,
    
    -- Usage & Billing
    usage_metrics JSONB DEFAULT '{}',
    
    -- System fields
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(organization_id, date)
);

-- Webhooks table
CREATE TABLE webhooks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    
    -- Configuration
    events TEXT[] NOT NULL, -- ['message.sent', 'session.started', etc.]
    secret VARCHAR(255),
    headers JSONB DEFAULT '{}',
    
    -- Status & Health
    is_active BOOLEAN DEFAULT TRUE,
    last_triggered_at TIMESTAMPTZ,
    last_success_at TIMESTAMPTZ,
    last_failure_at TIMESTAMPTZ,
    failure_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    
    -- System fields
    status status_type DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Webhook Deliveries table
CREATE TABLE webhook_deliveries (
    id UUID DEFAULT uuid_generate_v4(),
    webhook_id UUID NOT NULL REFERENCES webhooks(id) ON DELETE CASCADE,
    
    -- Delivery Details
    event_type VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    
    -- HTTP Details
    http_status INTEGER,
    response_body TEXT,
    response_headers JSONB,
    
    -- Timing
    delivered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    response_time_ms INTEGER,
    
    -- Retry Logic
    attempt_number INTEGER DEFAULT 1,
    is_success BOOLEAN DEFAULT FALSE,
    error_message TEXT,
    next_retry_at TIMESTAMPTZ,
    
    -- System fields
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Create comprehensive indexes for better performance
CREATE INDEX CONCURRENTLY idx_organizations_status ON organizations(status) WHERE status = 'active';
CREATE INDEX CONCURRENTLY idx_organizations_subscription ON organizations(subscription_plan_id, subscription_status);

CREATE INDEX CONCURRENTLY idx_users_organization_id ON users(organization_id) WHERE deleted_at IS NULL;
CREATE INDEX CONCURRENTLY idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX CONCURRENTLY idx_users_role ON users(role);
CREATE INDEX CONCURRENTLY idx_users_status ON users(status);

CREATE INDEX CONCURRENTLY idx_user_sessions_user_active ON user_sessions(user_id, is_active) WHERE is_active = TRUE;
CREATE INDEX CONCURRENTLY idx_user_sessions_expires ON user_sessions(expires_at);

CREATE INDEX CONCURRENTLY idx_api_keys_org_status ON api_keys(organization_id, status) WHERE status = 'active';
CREATE INDEX CONCURRENTLY idx_api_keys_hash ON api_keys(key_hash);

CREATE INDEX CONCURRENTLY idx_subscriptions_org_status ON subscriptions(organization_id, status);
CREATE INDEX CONCURRENTLY idx_subscriptions_next_payment ON subscriptions(next_payment_date) WHERE status = 'success';

CREATE INDEX CONCURRENTLY idx_usage_tracking_org_date ON usage_tracking(organization_id, date);
CREATE INDEX CONCURRENTLY idx_usage_tracking_quota ON usage_tracking(quota_type, date);

CREATE INDEX CONCURRENTLY idx_knowledge_articles_org_category ON knowledge_articles(organization_id, category_id);
CREATE INDEX CONCURRENTLY idx_knowledge_articles_type ON knowledge_articles(article_type);
CREATE INDEX CONCURRENTLY idx_knowledge_articles_language ON knowledge_articles(language);
CREATE INDEX CONCURRENTLY idx_knowledge_articles_status ON knowledge_articles(status);
CREATE INDEX CONCURRENTLY idx_knowledge_articles_published ON knowledge_articles(published_at) WHERE status = 'active';

-- Full-text search indexes
CREATE INDEX CONCURRENTLY idx_knowledge_articles_search ON knowledge_articles 
USING gin(to_tsvector('indonesian', coalesce(title, '') || ' ' || coalesce(content, '') || ' ' || coalesce(question, '') || ' ' || coalesce(answer, '')));

CREATE INDEX CONCURRENTLY idx_knowledge_articles_tags ON knowledge_articles USING gin(tags);
CREATE INDEX CONCURRENTLY idx_knowledge_articles_keywords ON knowledge_articles USING gin(keywords);

-- Note: Vector similarity search would require pgvector extension
-- For now, embeddings are stored as JSONB for compatibility

CREATE INDEX CONCURRENTLY idx_chat_sessions_org_date ON chat_sessions(organization_id, date(started_at));
CREATE INDEX CONCURRENTLY idx_chat_sessions_customer ON chat_sessions(customer_id);
CREATE INDEX CONCURRENTLY idx_chat_sessions_agent ON chat_sessions(agent_id);
CREATE INDEX CONCURRENTLY idx_chat_sessions_active ON chat_sessions(is_active) WHERE is_active = TRUE;

CREATE INDEX CONCURRENTLY idx_messages_session_created ON messages(session_id, created_at);
CREATE INDEX CONCURRENTLY idx_messages_sender_type ON messages(sender_type);
CREATE INDEX CONCURRENTLY idx_messages_intent ON messages(intent) WHERE intent IS NOT NULL;
CREATE INDEX CONCURRENTLY idx_messages_org_date ON messages(organization_id, date(created_at));

CREATE INDEX CONCURRENTLY idx_customers_org_channel ON customers(organization_id, channel);
CREATE INDEX CONCURRENTLY idx_customers_email ON customers(email) WHERE email IS NOT NULL;
CREATE INDEX CONCURRENTLY idx_customers_phone ON customers(phone) WHERE phone IS NOT NULL;

CREATE INDEX CONCURRENTLY idx_agents_org_availability ON agents(organization_id, availability_status);
CREATE INDEX CONCURRENTLY idx_agents_active_chats ON agents(current_active_chats) WHERE current_active_chats > 0;

CREATE INDEX CONCURRENTLY idx_ai_conversations_org_date ON ai_conversations_log(organization_id, date(created_at));
CREATE INDEX CONCURRENTLY idx_ai_conversations_model ON ai_conversations_log(ai_model_id);

CREATE INDEX CONCURRENTLY idx_audit_logs_org_date ON audit_logs(organization_id, date(created_at));
CREATE INDEX CONCURRENTLY idx_audit_logs_user_action ON audit_logs(user_id, action);
CREATE INDEX CONCURRENTLY idx_audit_logs_resource ON audit_logs(resource_type, resource_id);

CREATE INDEX CONCURRENTLY idx_api_rate_limits_key_window ON api_rate_limits(api_key_id, window_start);
CREATE INDEX CONCURRENTLY idx_api_rate_limits_ip_window ON api_rate_limits(ip_address, window_start);

-- Create functions and triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables with updated_at column
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON subscription_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_billing_invoices_updated_at BEFORE UPDATE ON billing_invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_models_updated_at BEFORE UPDATE ON ai_models FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_knowledge_categories_updated_at BEFORE UPDATE ON knowledge_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_knowledge_articles_updated_at BEFORE UPDATE ON knowledge_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bot_personalities_updated_at BEFORE UPDATE ON bot_personalities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_channel_configs_updated_at BEFORE UPDATE ON channel_configs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chat_sessions_updated_at BEFORE UPDATE ON chat_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_training_data_updated_at BEFORE UPDATE ON ai_training_data FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_api_rate_limits_updated_at BEFORE UPDATE ON api_rate_limits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_webhooks_updated_at BEFORE UPDATE ON webhooks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update search vector for knowledge articles
CREATE OR REPLACE FUNCTION update_knowledge_article_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('indonesian', 
        coalesce(NEW.title, '') || ' ' || 
        coalesce(NEW.content, '') || ' ' || 
        coalesce(NEW.question, '') || ' ' || 
        coalesce(NEW.answer, '') || ' ' ||
        coalesce(array_to_string(NEW.keywords, ' '), '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating search vector
CREATE TRIGGER trigger_update_knowledge_article_search_vector
    BEFORE INSERT OR UPDATE ON knowledge_articles
    FOR EACH ROW EXECUTE FUNCTION update_knowledge_article_search_vector();

-- Function to update category content count
CREATE OR REPLACE FUNCTION update_category_content_count()
RETURNS TRIGGER AS $$
BEGIN
    -- Update old category count if changing category
    IF TG_OP = 'UPDATE' AND OLD.category_id != NEW.category_id THEN
        UPDATE knowledge_categories 
        SET content_count = (
            SELECT COUNT(*) FROM knowledge_articles 
            WHERE category_id = OLD.category_id AND status = 'active'
        )
        WHERE id = OLD.category_id;
    END IF;
    
    -- Update new category count
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE knowledge_categories 
        SET content_count = (
            SELECT COUNT(*) FROM knowledge_articles 
            WHERE category_id = NEW.category_id AND status = 'active'
        )
        WHERE id = NEW.category_id;
    END IF;
    
    -- Update old category count on delete
    IF TG_OP = 'DELETE' THEN
        UPDATE knowledge_categories 
        SET content_count = (
            SELECT COUNT(*) FROM knowledge_articles 
            WHERE category_id = OLD.category_id AND status = 'active'
        )
        WHERE id = OLD.category_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger for category content count
CREATE TRIGGER trigger_update_category_content_count
    AFTER INSERT OR UPDATE OR DELETE ON knowledge_articles
    FOR EACH ROW EXECUTE FUNCTION update_category_content_count();

-- Function to track organization usage
CREATE OR REPLACE FUNCTION track_organization_usage()
RETURNS TRIGGER AS $$
DECLARE
    usage_date DATE := CURRENT_DATE;
    quota_type_val quota_type;
BEGIN
    -- Determine quota type based on table
    CASE TG_TABLE_NAME
        WHEN 'messages' THEN quota_type_val := 'messages';
        WHEN 'ai_conversations_log' THEN quota_type_val := 'ai_requests';
        ELSE RETURN COALESCE(NEW, OLD);
    END CASE;
    
    -- Update usage tracking
    INSERT INTO usage_tracking (organization_id, date, quota_type, used_amount)
    VALUES (NEW.organization_id, usage_date, quota_type_val, 1)
    ON CONFLICT (organization_id, date, quota_type)
    DO UPDATE SET used_amount = usage_tracking.used_amount + 1;
    
    -- Update organization current usage
    UPDATE organizations 
    SET current_usage = jsonb_set(
        current_usage,
        ARRAY[quota_type_val::text],
        to_jsonb(COALESCE((current_usage->>quota_type_val::text)::integer, 0) + 1)
    )
    WHERE id = NEW.organization_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply usage tracking triggers
CREATE TRIGGER trigger_track_message_usage
    AFTER INSERT ON messages
    FOR EACH ROW EXECUTE FUNCTION track_organization_usage();

CREATE TRIGGER trigger_track_ai_usage
    AFTER INSERT ON ai_conversations_log
    FOR EACH ROW EXECUTE FUNCTION track_organization_usage();

-- Function to clean expired sessions
CREATE OR REPLACE FUNCTION clean_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM user_sessions WHERE expires_at < CURRENT_TIMESTAMP;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to create monthly partitions
CREATE OR REPLACE FUNCTION create_monthly_partitions(table_name TEXT, months_ahead INTEGER DEFAULT 3)
RETURNS VOID AS $$
DECLARE
    start_date DATE;
    end_date DATE;
    partition_name TEXT;
    partition_sql TEXT;
    i INTEGER;
BEGIN
    FOR i IN 1..months_ahead LOOP
        start_date := DATE_TRUNC('month', CURRENT_DATE + INTERVAL '1 month' * i);
        end_date := start_date + INTERVAL '1 month';
        partition_name := table_name || '_' || TO_CHAR(start_date, 'YYYY_MM');
        
        partition_sql := FORMAT(
            'CREATE TABLE IF NOT EXISTS %I PARTITION OF %I FOR VALUES FROM (%L) TO (%L)',
            partition_name, table_name, start_date, end_date
        );
        
        EXECUTE partition_sql;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create materialized views for analytics
CREATE MATERIALIZED VIEW mv_organization_analytics AS
SELECT 
    o.id as organization_id,
    o.name as organization_name,
    o.subscription_status,
    sp.name as plan_name,
    COUNT(DISTINCT u.id) as total_users,
    COUNT(DISTINCT a.id) as total_agents,
    COUNT(DISTINCT c.id) as total_customers,
    COUNT(DISTINCT cc.id) as total_channels,
    COUNT(DISTINCT ka.id) as total_articles,
    COALESCE(SUM(ad.total_sessions), 0) as total_sessions_last_30_days,
    COALESCE(AVG(ad.satisfaction_avg), 0) as avg_satisfaction_last_30_days,
    o.created_at
FROM organizations o
LEFT JOIN subscription_plans sp ON o.subscription_plan_id = sp.id
LEFT JOIN users u ON o.id = u.organization_id AND u.deleted_at IS NULL
LEFT JOIN agents a ON o.id = a.organization_id AND a.status = 'active'
LEFT JOIN customers c ON o.id = c.organization_id AND c.status = 'active'
LEFT JOIN channel_configs cc ON o.id = cc.organization_id AND cc.status = 'active'
LEFT JOIN knowledge_articles ka ON o.id = ka.organization_id AND ka.status = 'active'
LEFT JOIN analytics_daily ad ON o.id = ad.organization_id AND ad.date >= CURRENT_DATE - INTERVAL '30 days'
WHERE o.status = 'active'
GROUP BY o.id, o.name, o.subscription_status, sp.name, o.created_at;

CREATE UNIQUE INDEX ON mv_organization_analytics (organization_id);

-- Insert sample data for development and testing
INSERT INTO subscription_plans (name, display_name, description, tier, price_monthly, price_yearly, max_agents, max_channels, max_knowledge_articles, max_monthly_messages, max_monthly_ai_requests, features) VALUES
('Trial', 'Free Trial', '14-day free trial with basic features', 'trial', 0, 0, 1, 1, 50, 100, 10, '{"ai_assistant": false, "sentiment_analysis": false}'),
('Starter', 'Starter Plan', 'Perfect for small businesses', 'starter', 99000, 990000, 3, 2, 200, 1000, 100, '{"ai_assistant": true, "sentiment_analysis": false}'),
('Professional', 'Professional Plan', 'Advanced features for growing businesses', 'professional', 299000, 2990000, 10, 5, 1000, 10000, 1000, '{"ai_assistant": true, "sentiment_analysis": true, "advanced_analytics": true}'),
('Enterprise', 'Enterprise Plan', 'Full-featured plan for large organizations', 'enterprise', 999000, 9990000, -1, -1, -1, 100000, 10000, '{"ai_assistant": true, "sentiment_analysis": true, "advanced_analytics": true, "custom_branding": true, "api_access": true, "priority_support": true}');

INSERT INTO organizations (org_code, name, display_name, email, phone, website, subscription_plan_id, subscription_status) VALUES
('DEMO001', 'Demo Organization', 'Demo Corp', 'admin@demo.com', '+62812345678', 'https://demo.com', (SELECT id FROM subscription_plans WHERE name = 'Professional'), 'active'),
('TEST001', 'Test Company', 'Test Co.', 'admin@test.com', '+62812345679', 'https://test.com', (SELECT id FROM subscription_plans WHERE name = 'Starter'), 'trial');

INSERT INTO users (organization_id, email, username, password_hash, full_name, role) VALUES
((SELECT id FROM organizations WHERE org_code = 'DEMO001'), 'admin@demo.com', 'admin', '$2b$10$example_hash', 'Demo Admin', 'org_admin'),
((SELECT id FROM organizations WHERE org_code = 'DEMO001'), 'agent@demo.com', 'agent1', '$2b$10$example_hash', 'Demo Agent', 'agent');

INSERT INTO ai_models (organization_id, name, model_type, system_prompt) VALUES
((SELECT id FROM organizations WHERE org_code = 'DEMO001'), 'Default GPT-4', 'gpt-4', 'You are a helpful customer service assistant. Be polite, professional, and concise in your responses.');

INSERT INTO knowledge_categories (organization_id, name, slug, description, icon, color) VALUES
((SELECT id FROM organizations WHERE org_code = 'DEMO001'), 'General FAQ', 'general-faq', 'Frequently asked questions', 'help-circle', '#3B82F6'),
((SELECT id FROM organizations WHERE org_code = 'DEMO001'), 'Technical Support', 'technical-support', 'Technical help and troubleshooting', 'settings', '#10B981');

-- Create scheduled jobs (requires pg_cron extension)
-- SELECT cron.schedule('clean-expired-sessions', '0 2 * * *', 'SELECT chatbot.clean_expired_sessions();');
-- SELECT cron.schedule('refresh-analytics-mv', '*/5 * * * *', 'REFRESH MATERIALIZED VIEW CONCURRENTLY chatbot.mv_organization_analytics;');
-- SELECT cron.schedule('create-monthly-partitions', '0 0 1 * *', 'SELECT chatbot.create_monthly_partitions(''chat_sessions''); SELECT chatbot.create_monthly_partitions(''messages''); SELECT chatbot.create_monthly_partitions(''ai_conversations_log''); SELECT chatbot.create_monthly_partitions(''audit_logs'');');

-- Comments for documentation
COMMENT ON SCHEMA chatbot IS 'Enhanced ChatBot AI + Human Multi-tenant SAAS Database Schema for PostgreSQL 15';
COMMENT ON TABLE subscription_plans IS 'SAAS subscription plans with pricing and feature configuration';
COMMENT ON TABLE organizations IS 'Enhanced organization table with subscription, usage tracking, and SAAS features';
COMMENT ON TABLE api_keys IS 'API keys for programmatic access with rate limiting and security controls';
COMMENT ON TABLE subscriptions IS 'Organization subscriptions with billing cycle and payment tracking';
COMMENT ON TABLE billing_invoices IS 'Billing invoices with payment status and transaction details';
COMMENT ON TABLE usage_tracking IS 'Daily usage tracking for quota management and billing';
COMMENT ON TABLE users IS 'Enhanced user table with session management and security features';
COMMENT ON TABLE user_sessions IS 'User session management with security tracking';
COMMENT ON TABLE ai_models IS 'AI model configurations with performance metrics';
COMMENT ON TABLE knowledge_categories IS 'Knowledge base categories with AI training support';
COMMENT ON TABLE knowledge_articles IS 'Enhanced knowledge base with AI embeddings and version control';
COMMENT ON TABLE bot_personalities IS 'Bot personality configurations with AI model integration';
COMMENT ON TABLE channel_configs IS 'Multi-channel integration with enhanced security';
COMMENT ON TABLE customers IS 'Customer profiles with AI insights and behavioral data';
COMMENT ON TABLE agents IS 'Agent profiles with AI assistance and performance metrics';
COMMENT ON TABLE chat_sessions IS 'Enhanced chat sessions with AI analytics (partitioned)';
COMMENT ON TABLE messages IS 'Enhanced message table with AI processing and sentiment analysis (partitioned)';
COMMENT ON TABLE ai_training_data IS 'AI training data collection with quality validation';
COMMENT ON TABLE ai_conversations_log IS 'AI conversation logging with performance metrics (partitioned)';
COMMENT ON TABLE audit_logs IS 'Comprehensive audit logging with API tracking (partitioned)';
COMMENT ON TABLE api_rate_limits IS 'API rate limiting with IP and key-based controls';
COMMENT ON TABLE analytics_daily IS 'Enhanced daily analytics with AI metrics';
COMMENT ON TABLE webhooks IS 'Webhook configuration for real-time event notifications';
COMMENT ON TABLE webhook_deliveries IS 'Webhook delivery tracking with retry logic (partitioned)';

-- Final optimizations
ANALYZE;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '🎉 Enhanced ChatBot SAAS Database Schema Created Successfully!';
    RAISE NOTICE '📊 Schema: chatbot';
    RAISE NOTICE '📋 Tables: 25+ core tables with SAAS features';
    RAISE NOTICE '🔍 Indexes: Performance indexes with concurrent creation';
    RAISE NOTICE '⚡ Triggers: Auto-update and usage tracking triggers';
    RAISE NOTICE '📈 Partitioning: Enabled for high-volume tables';
    RAISE NOTICE '🤖 AI Features: Model management, training data, conversation logs';
    RAISE NOTICE '💰 SAAS Features: Subscriptions, billing, usage tracking, API management';
    RAISE NOTICE '🔒 Security: Enhanced with audit logs, rate limiting, session management';
    RAISE NOTICE '✅ PostgreSQL 15 Ready!';
END $$;
