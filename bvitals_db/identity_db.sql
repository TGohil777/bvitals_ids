CREATE SEQUENCE IF NOT EXISTS public.seq_authid
 INCREMENT BY 1
 START WITH 10000
 NO MAXVALUE
 NO MINVALUE
 CACHE 1;
 
CREATE SEQUENCE IF NOT EXISTS public.seq_authroleid
 INCREMENT BY 1
 START WITH 10000
 NO MAXVALUE
 NO MINVALUE
 CACHE 1; 

create table auth(
  	authid Bigint DEFAULT nextval('seq_authid') NOT NULL,
	firstname character varying(200) not null,
	lastname character varying(200) not null,
	email character varying(200) not null,
	password character varying(200) not null,
	active boolean not null default FALSE,
	deleted boolean not null default FALSE,
    createdtsz Timestamp with time zone DEFAULT now() NOT NULL,
	updatedtsz Timestamp with time zone,
    deletedtsz Timestamp with time zone
);

create table role (
	roleid integer  NOT NULL,
	name character varying(200) not null,
	createdtsz Timestamp with time zone DEFAULT now() NOT NULL
);

create table authrole (
	authroleid Bigint DEFAULT nextval('seq_authroleid') NOT NULL,
	roleid integer,
	authid bigint,
	createdtsz Timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.auth ADD CONSTRAINT pk_auth PRIMARY KEY (authid);
ALTER TABLE public.role ADD CONSTRAINT pk_role PRIMARY KEY (roleid);
ALTER TABLE public.authrole ADD CONSTRAINT pk_authrole PRIMARY KEY (authroleid);
ALTER TABLE public.authrole ADD CONSTRAINT fk_authrole_authid FOREIGN KEY ( authid ) REFERENCES public.auth( authid );
ALTER TABLE public.authrole ADD CONSTRAINT fk_authrole_roleid FOREIGN KEY ( roleid ) REFERENCES public.role( roleid );