create table public.contact_messages(
  id bigint generated always as identity primary key,
  sender_email text not null
    check (char_length(sender_email) between 3 and 254),
  message text not null
    check (char_length(btrim(message)) between 1 and 5000),
  status text not null default 'new'
    check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

revoke all on table public.contact_messages from anon, authenticated;
revoke all on sequence public.contact_messages_id_seq from anon, authenticated;

grant select, insert, update, delete
  on table public.contact_messages
  to service_role;

grant usage, select
  on sequence public.contact_messages_id_seq 
  to service_role;
