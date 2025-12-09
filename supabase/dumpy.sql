


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




ALTER SCHEMA "public" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."City" (
    "id" integer NOT NULL,
    "cityName" "text" NOT NULL,
    "country" "text" NOT NULL,
    "xAxis" double precision NOT NULL,
    "yAxis" double precision NOT NULL,
    "zAxis" double precision NOT NULL,
    "productId" integer NOT NULL
);


ALTER TABLE "public"."City" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."City_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."City_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."City_id_seq" OWNED BY "public"."City"."id";



CREATE TABLE IF NOT EXISTS "public"."Demand" (
    "id" integer NOT NULL,
    "demand_score" integer NOT NULL,
    "productId" integer,
    "regionId" integer
);


ALTER TABLE "public"."Demand" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."Demand_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."Demand_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."Demand_id_seq" OWNED BY "public"."Demand"."id";



CREATE TABLE IF NOT EXISTS "public"."Post" (
    "id" integer NOT NULL,
    "title" "text" NOT NULL,
    "content" "text",
    "published" boolean DEFAULT false NOT NULL,
    "authorId" integer NOT NULL
);


ALTER TABLE "public"."Post" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."Post_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."Post_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."Post_id_seq" OWNED BY "public"."Post"."id";



CREATE TABLE IF NOT EXISTS "public"."Product" (
    "id" integer NOT NULL,
    "productName" "text" NOT NULL,
    "price" integer NOT NULL,
    "quantitySold" integer NOT NULL
);


ALTER TABLE "public"."Product" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."Product_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."Product_id_seq" OWNED BY "public"."Product"."id";



CREATE TABLE IF NOT EXISTS "public"."Region" (
    "id" integer NOT NULL,
    "population" integer NOT NULL,
    "xTile" integer NOT NULL,
    "zTile" integer NOT NULL,
    "cityId" integer NOT NULL,
    "name" "text" NOT NULL
);


ALTER TABLE "public"."Region" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."Region_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."Region_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."Region_id_seq" OWNED BY "public"."Region"."id";



CREATE TABLE IF NOT EXISTS "public"."User" (
    "id" integer NOT NULL,
    "email" "text" NOT NULL,
    "name" "text"
);


ALTER TABLE "public"."User" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."User_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."User_id_seq" OWNED BY "public"."User"."id";



CREATE TABLE IF NOT EXISTS "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) NOT NULL,
    "logs" "text",
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_steps_count" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."_prisma_migrations" OWNER TO "postgres";


ALTER TABLE ONLY "public"."City" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."City_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."Demand" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Demand_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."Post" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Post_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."Product" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Product_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."Region" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."Region_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."User" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."User_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."City"
    ADD CONSTRAINT "City_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Demand"
    ADD CONSTRAINT "Demand_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Region"
    ADD CONSTRAINT "Region_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_prisma_migrations"
    ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");



CREATE UNIQUE INDEX "City_cityName_key" ON "public"."City" USING "btree" ("cityName");



CREATE UNIQUE INDEX "Product_productName_key" ON "public"."Product" USING "btree" ("productName");



CREATE UNIQUE INDEX "Region_name_key" ON "public"."Region" USING "btree" ("name");



CREATE UNIQUE INDEX "User_email_key" ON "public"."User" USING "btree" ("email");



ALTER TABLE ONLY "public"."City"
    ADD CONSTRAINT "City_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."Demand"
    ADD CONSTRAINT "Demand_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."Demand"
    ADD CONSTRAINT "Demand_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."Region"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."Post"
    ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."Region"
    ADD CONSTRAINT "Region_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "public"."City"("id") ON UPDATE CASCADE ON DELETE RESTRICT;





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;







































































































































































































