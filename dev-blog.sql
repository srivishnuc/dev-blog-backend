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
    blogid numeric NOT NULL,
    rowid numeric NOT NULL,
    tagid numeric NOT NULL,
    userid numeric NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    created_date date DEFAULT CURRENT_DATE,
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


--comments--
---------------------------------
 -- Table: public.comments

-- DROP TABLE IF EXISTS public.comments;

CREATE TABLE IF NOT EXISTS public.comments
(
    id numeric NOT NULL,
    blogid numeric NOT NULL,
    userid numeric NOT NULL,
    created_date date DEFAULT CURRENT_DATE,
    CONSTRAINT pk_181 PRIMARY KEY (id),
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