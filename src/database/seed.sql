create table plans (
    id varchar(255) primary key,
    user_id varchar(255) not null,
    title varchar(255) not null,
    description text,
    date DATE not null,
    location varchar(255),
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
);

create table participants (
    id varchar(255) primary key,
    plan_id varchar(255) not null,
    name varchar(255) not null,
    email varchar(255) not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    constraint FK_participant_plan foreign key (plan_id) references plans (id)
);