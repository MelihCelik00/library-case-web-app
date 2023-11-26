--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.7 (Homebrew)

-- Started on 2023-11-26 13:41:41 +03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 49416)
-- Name: BookBorrowings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BookBorrowings" (
    id integer NOT NULL,
    "UserId" integer,
    "BookId" integer,
    "isBorrowed" boolean DEFAULT false,
    "isReturned" boolean DEFAULT false,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."BookBorrowings" OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 49415)
-- Name: BookBorrowings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BookBorrowings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."BookBorrowings_id_seq" OWNER TO postgres;

--
-- TOC entry 3622 (class 0 OID 0)
-- Dependencies: 214
-- Name: BookBorrowings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BookBorrowings_id_seq" OWNED BY public."BookBorrowings".id;


--
-- TOC entry 217 (class 1259 OID 49427)
-- Name: BookRatings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BookRatings" (
    id integer NOT NULL,
    "UserId" integer,
    "BookId" integer,
    score double precision,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."BookRatings" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 49426)
-- Name: BookRatings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BookRatings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."BookRatings_id_seq" OWNER TO postgres;

--
-- TOC entry 3623 (class 0 OID 0)
-- Dependencies: 216
-- Name: BookRatings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BookRatings_id_seq" OWNED BY public."BookRatings".id;


--
-- TOC entry 213 (class 1259 OID 49407)
-- Name: Books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Books" (
    id integer NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Books" OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 49406)
-- Name: Books_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Books_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Books_id_seq" OWNER TO postgres;

--
-- TOC entry 3624 (class 0 OID 0)
-- Dependencies: 212
-- Name: Books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Books_id_seq" OWNED BY public."Books".id;


--
-- TOC entry 209 (class 1259 OID 49392)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 49398)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 49397)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO postgres;

--
-- TOC entry 3625 (class 0 OID 0)
-- Dependencies: 210
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 3456 (class 2604 OID 49419)
-- Name: BookBorrowings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookBorrowings" ALTER COLUMN id SET DEFAULT nextval('public."BookBorrowings_id_seq"'::regclass);


--
-- TOC entry 3461 (class 2604 OID 49430)
-- Name: BookRatings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookRatings" ALTER COLUMN id SET DEFAULT nextval('public."BookRatings_id_seq"'::regclass);


--
-- TOC entry 3453 (class 2604 OID 49410)
-- Name: Books id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Books" ALTER COLUMN id SET DEFAULT nextval('public."Books_id_seq"'::regclass);


--
-- TOC entry 3450 (class 2604 OID 49401)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 3471 (class 2606 OID 49425)
-- Name: BookBorrowings BookBorrowings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookBorrowings"
    ADD CONSTRAINT "BookBorrowings_pkey" PRIMARY KEY (id);


--
-- TOC entry 3473 (class 2606 OID 49434)
-- Name: BookRatings BookRatings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookRatings"
    ADD CONSTRAINT "BookRatings_pkey" PRIMARY KEY (id);


--
-- TOC entry 3469 (class 2606 OID 49414)
-- Name: Books Books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Books"
    ADD CONSTRAINT "Books_pkey" PRIMARY KEY (id);


--
-- TOC entry 3465 (class 2606 OID 49396)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 3467 (class 2606 OID 49405)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3475 (class 2606 OID 49440)
-- Name: BookBorrowings custom_fkey_bookId_BookBorrowings; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookBorrowings"
    ADD CONSTRAINT "custom_fkey_bookId_BookBorrowings" FOREIGN KEY ("BookId") REFERENCES public."Books"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3477 (class 2606 OID 49450)
-- Name: BookRatings custom_fkey_bookId_BookRatings; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookRatings"
    ADD CONSTRAINT "custom_fkey_bookId_BookRatings" FOREIGN KEY ("BookId") REFERENCES public."Books"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3474 (class 2606 OID 49435)
-- Name: BookBorrowings custom_fkey_userId_BookBorrowings; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookBorrowings"
    ADD CONSTRAINT "custom_fkey_userId_BookBorrowings" FOREIGN KEY ("UserId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3476 (class 2606 OID 49445)
-- Name: BookRatings custom_fkey_userId_BookRatings; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BookRatings"
    ADD CONSTRAINT "custom_fkey_userId_BookRatings" FOREIGN KEY ("UserId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2023-11-26 13:41:41 +03

--
-- PostgreSQL database dump complete
--

