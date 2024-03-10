create table plans (
    id uuid primary key,
    user_id uuid not null,
    title varchar(255) not null,
    description text,
    date DATE not null,
    location varchar(255),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table participants (
    id uuid primary key,
    plan_id uuid not null,
    name varchar(255) not null,
    email varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint FK_participant_plan foreign key (plan_id) references plans (id)
);