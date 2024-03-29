--users--
-----------------------------
-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    userid numeric NOT NULL,
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(50) COLLATE pg_catalog."default",
    phone numeric,
    rowid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    created_date date NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT pk_129 PRIMARY KEY (userid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;



--tags--
------------------------------
-- Table: public.tags

-- DROP TABLE IF EXISTS public.tags;

CREATE TABLE IF NOT EXISTS public.tags
(
    tagid numeric NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    rowid numeric NOT NULL,
    CONSTRAINT pk_140 PRIMARY KEY (tagid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tags
    OWNER to postgres;


--blogs--
--------------------------------
-- Table: public.blogs

-- DROP TABLE IF EXISTS public.blogs;

CREATE TABLE IF NOT EXISTS public.blogs
(
    blogid bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 100000 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    rowid integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    tagid numeric,
    userid integer NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    created_date date DEFAULT CURRENT_DATE,
    header character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_145 PRIMARY KEY (blogid),
    CONSTRAINT fk_158 FOREIGN KEY (userid)
        REFERENCES public.users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_161 FOREIGN KEY (tagid)
        REFERENCES public.tags (tagid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.blogs
    OWNER to postgres;
-- Index: fk_160

-- DROP INDEX IF EXISTS public.fk_160;

CREATE INDEX IF NOT EXISTS fk_160
    ON public.blogs USING btree
    (userid ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fk_163

-- DROP INDEX IF EXISTS public.fk_163;

CREATE INDEX IF NOT EXISTS fk_163
    ON public.blogs USING btree
    (tagid ASC NULLS LAST)
    TABLESPACE pg_default;

 --comments
  -- Table: public.comments

-- DROP TABLE IF EXISTS public.comments;

CREATE TABLE IF NOT EXISTS public.comments
(
    rowid integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    blogid bigint NOT NULL,
    userid integer NOT NULL,
    created_date timestamp with time zone DEFAULT CURRENT_DATE,
    comment character varying COLLATE pg_catalog."default",
    active "char" NOT NULL,
    updated_date timestamp with time zone,
    CONSTRAINT comment_pkey PRIMARY KEY (blogid, userid, active),
    CONSTRAINT fk_166 FOREIGN KEY (blogid)
        REFERENCES public.blogs (blogid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_173 FOREIGN KEY (userid)
        REFERENCES public.users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.comments
    OWNER to postgres;
-- Index: fk_168

-- DROP INDEX IF EXISTS public.fk_168;

CREATE INDEX IF NOT EXISTS fk_168
    ON public.comments USING btree
    (blogid ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fk_175

-- DROP INDEX IF EXISTS public.fk_175;

CREATE INDEX IF NOT EXISTS fk_175
    ON public.comments USING btree
    (userid ASC NULLS LAST)
    TABLESPACE pg_default;

----likes

-- Table: public.likes

-- DROP TABLE IF EXISTS public.likes;

CREATE TABLE IF NOT EXISTS public.likes
(
    rowid integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    blogid bigint NOT NULL,
    userid integer NOT NULL,
    created_date timestamp with time zone DEFAULT now(),
    likes smallint NOT NULL DEFAULT 1,
    active "char" NOT NULL,
    updated_date timestamp with time zone,
    CONSTRAINT like_pkey PRIMARY KEY (blogid, userid, active),
    CONSTRAINT fk_166 FOREIGN KEY (blogid)
        REFERENCES public.blogs (blogid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_173 FOREIGN KEY (userid)
        REFERENCES public.users (userid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.likes
    OWNER to postgres;
-- Index: fk_like1

-- DROP INDEX IF EXISTS public.fk_like1;

CREATE INDEX IF NOT EXISTS fk_like1
    ON public.likes USING btree
    (blogid ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: fk_like2

-- DROP INDEX IF EXISTS public.fk_like2;

CREATE INDEX IF NOT EXISTS fk_like2
    ON public.likes USING btree
    (userid ASC NULLS LAST)
    TABLESPACE pg_default;

-------------------------------------
--
--
--PROCEDURE ------
--
-------------------------------------

-- PROCEDURE: public.updatelike(bigint, integer, character)

-- DROP PROCEDURE IF EXISTS public.updatelike(bigint, integer, character);

CREATE OR REPLACE PROCEDURE public.updatelike(
	IN p_blogid bigint,
	IN p_userid integer,
	IN p_status character)
LANGUAGE 'plpgsql'
AS $BODY$
declare
isAvailable numeric ; 
begin
  select count(*) into isAvailable from likes where blogid = p_blogid and userid = p_userid;
  if isAvailable >= 1 then
  update likes set active = p_status , updated_date = now() where blogid= p_blogid and userid = p_userid;
  else
  insert into likes(blogid,userid,likes,active,updated_date) values(p_blogid,p_userid,1,p_status,now());
  end if;
end; 
$BODY$;
ALTER PROCEDURE public.updatelike(bigint, integer, character)
    OWNER TO postgres;

-----

-- PROCEDURE: public.updatecomment(bigint, integer, character, character varying)

-- DROP PROCEDURE IF EXISTS public.updatecomment(bigint, integer, character, character varying);

CREATE OR REPLACE PROCEDURE public.updatecomment(
	IN p_blogid bigint,
	IN p_userid integer,
	IN p_status character,
	IN p_comment character varying)
LANGUAGE 'plpgsql'
AS $BODY$
declare
isAvailable numeric; 
begin
  select count(*) into isAvailable from comments where blogid = p_blogid and userid = p_userid;
  if isAvailable >= 1 then
  update comments set active = p_status , comment = p_comment , updated_date = now() where blogid= p_blogid and userid = p_userid;
  else
  insert into comments(blogid,userid,comment,active,updated_date) values(p_blogid,p_userid,p_comment,p_status,now());
  end if;
end; 
$BODY$;
ALTER PROCEDURE public.updatecomment(bigint, integer, character, character varying)
    OWNER TO postgres;
