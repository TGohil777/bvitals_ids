 
CREATE SEQUENCE IF NOT EXISTS public.seq_orguserid
 INCREMENT BY 1
 START WITH 10000
 NO MAXVALUE
 NO MINVALUE
 CACHE 1; 

CREATE SEQUENCE IF NOT EXISTS public.seq_organizationid
 INCREMENT BY 1
 START WITH 10000
 NO MAXVALUE
 NO MINVALUE
 CACHE 1; 
 
CREATE SEQUENCE IF NOT EXISTS public.seq_profileid
 INCREMENT BY 1
 START WITH 10000
 NO MAXVALUE
 NO MINVALUE
 CACHE 1; 
 
CREATE SEQUENCE IF NOT EXISTS public.seq_locationid
 INCREMENT BY 1
 START WITH 10000
 NO MAXVALUE
 NO MINVALUE
 CACHE 1;  
 
 
CREATE SEQUENCE IF NOT EXISTS public.seq_encounterid
 INCREMENT BY 1
 START WITH 10000
 NO MAXVALUE
 NO MINVALUE
 CACHE 1;  
 
CREATE SEQUENCE IF NOT EXISTS public.seq_encounterreportid
 INCREMENT BY 1
 START WITH 10000
 NO MAXVALUE
 NO MINVALUE
 CACHE 1;  
 
create table organization(
  	organizationid Bigint DEFAULT nextval('seq_organizationid') NOT NULL,
	name character varying(500) not null,
	webaddress character varying(500) not null,
	subdomain character varying(500) not null,
	deleted boolean not null default FALSE,
	themecolor character varying(10) not null,
	logourl character varying(256) not null,
	createdtsz Timestamp with time zone DEFAULT now() NOT NULL,
	updatedtsz Timestamp with time zone,
    deletedtsz Timestamp with time zone
);

create table location(
  	locationid Bigint DEFAULT nextval('seq_locationid') NOT NULL,
	name character varying(500) not null,
	organizationid Bigint,
	deleted boolean not null default FALSE,
	createdtsz Timestamp with time zone DEFAULT now() NOT NULL,	
	updatedtsz Timestamp with time zone,
	deletedtsz Timestamp with time zone    
);

create table orguser(
  	orguserid Bigint DEFAULT nextval('seq_orguserid') NOT NULL,
	firstname character varying(200) not null,
	lastname character varying(200) not null,
	email character varying(200) not null,	
	orgusertype character varying(50) not null,
	isadmin boolean not null default FALSE,
	organizationid Bigint,
	accountid Bigint,
	deleted boolean not null default FALSE,
	createdtsz Timestamp with time zone DEFAULT now() NOT NULL,	
	updatedtsz Timestamp with time zone,
	deletedtsz Timestamp with time zone    
);

create table profile(
  	profileid Bigint DEFAULT nextval('seq_profileid') NOT NULL,
	firstname character varying(200) not null,
	middlename character varying(200) not null,
	lastname character varying(200) not null,
	gender character varying(20) not null,
	relationship character varying(20) not null,
	ethnicity character varying(20) not null,
	race character varying(20) not null,
	accountid Bigint,
	deleted boolean not null default FALSE,
	createdtsz Timestamp with time zone DEFAULT now() NOT NULL,
	updatedtsz Timestamp with time zone,
    deletedtsz Timestamp with time zone
);

create table encounter(
  	encounterid Bigint DEFAULT nextval('seq_encounterid') NOT NULL,
	profileid Bigint,
	status character varying(25) not null,
	deleted boolean not null default FALSE,
	createdtsz Timestamp with time zone DEFAULT now() NOT NULL,
	updatedtsz Timestamp with time zone,
    deletedtsz Timestamp with time zone
);

create table encounterreport(
  	encounterreportid Bigint DEFAULT nextval('seq_encounterreportid') NOT NULL,
	encounterid Bigint,
	referencekey character varying(36) not null,
	deleted boolean not null default FALSE,
	createdtsz Timestamp with time zone DEFAULT now() NOT NULL,
	updatedtsz Timestamp with time zone,
	deletedtsz Timestamp with time zone
);

ALTER TABLE public.profile ADD CONSTRAINT pk_profile PRIMARY KEY (profileid);
ALTER TABLE public.organization ADD CONSTRAINT pk_organization PRIMARY KEY (organizationid);
ALTER TABLE public.location ADD CONSTRAINT pk_location PRIMARY KEY (locationid);
ALTER TABLE public.location ADD CONSTRAINT fk_location_organizationid FOREIGN KEY ( organizationid ) REFERENCES public.organization( organizationid );
ALTER TABLE public.orguser ADD CONSTRAINT pk_orguser PRIMARY KEY (orguserid);
ALTER TABLE public.orguser ADD CONSTRAINT fk_orguser_organizationid FOREIGN KEY ( organizationid ) REFERENCES public.organization( organizationid );
ALTER TABLE public.encounter ADD CONSTRAINT pk_encounter PRIMARY KEY (encounterid);
ALTER TABLE public.encounter ADD CONSTRAINT  fk_encounter_profileid FOREIGN KEY ( profileid ) REFERENCES public.profile( profileid );
ALTER TABLE public.encounterreport ADD CONSTRAINT pk_encounterreport PRIMARY KEY (encounterreportid);
ALTER TABLE public.encounterreport ADD CONSTRAINT  fk_encounterreport_encounterid FOREIGN KEY ( encounterid ) REFERENCES public.encounter( encounterid );

