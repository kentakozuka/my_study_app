###Read as bellow
###source ceate_tables.sql

#database
###この辺動作確認していないので、試す必要あり
#DROP DATABASE IF EXISTS `<db-name>`;
#DELETE FROM mysql.user WHERE user='<user-name>';
#FLUSH PRIVILEGES;
#CREATE DATABASE `<db-name>` DEFAULT CHARACTER SET utf8 ;
#GRANT ALL ON `<db-name>`.* to '<user-name>'@localhost identified by '<password>';
#FLUSH PRIVILEGES;


###ここから下は動作確認済
###QUESTION
DROP TABLE IF EXISTS QUESTION;
CREATE TABLE QUESTION (
		ID				INT		AUTO_INCREMENT
	,	EXAM_ID			INT
	,	CATEGORY_ID 	INT
	,	TYPE			ENUM('SELECT','TYPE')
	,	TITLE			VARCHAR(255)
	,	BODY			TEXT
	,	IMG_QUESTION_1	VARCHAR(255)
	,	IMG_QUESTION_2	VARCHAR(255)
	,	IMG_QUESTION_3	VARCHAR(255)
	,	IMG_QUESTION_4	VARCHAR(255)
	,	SELECTION_1		VARCHAR(255)
	,	SELECTION_2		VARCHAR(255)
	,	SELECTION_3		VARCHAR(255)
	,	SELECTION_4		VARCHAR(255)
	,	ANSWER			VARCHAR(255)
	,	EXPLANATION		TEXT
	,	IMG_EXPL_1		VARCHAR(255)
	,	IMG_EXPL_2		VARCHAR(255)
	,	IMG_EXPL_3		VARCHAR(255)
	,	IMG_EXPL_4		VARCHAR(255)
	,	REF_URL_1		TEXT
	,	REF_URL_2		TEXT
	,	REF_URL_3		TEXT
	,	REF_URL_4		TEXT
	,	SRC_QUESTION	TEXT
	,	CREATED_DATETIME timestamp not null default current_timestamp
	,	UPDATED_DATETIME timestamp not null default current_timestamp on update current_timestamp
	,	PRIMARY KEY (ID)
	,	INDEX(ID)
) character set utf8mb4;
###EXAM
DROP TABLE IF EXISTS EXAM;
CREATE TABLE EXAM (
		ID				INT AUTO_INCREMENT
	,	EXAM_NAME		VARCHAR(255)
	,	CREATED_DATETIME timestamp not null default current_timestamp
	,	UPDATED_DATETIME timestamp not null default current_timestamp on update current_timestamp
	,	PRIMARY KEY (ID)
	,	INDEX(ID)
) character set utf8mb4;
###USER
DROP TABLE IF EXISTS USER;
CREATE TABLE USER (
		ID				INT AUTO_INCREMENT
	,	USER_NAME		VARCHAR(20)
	,	USER_PASSWORD	VARCHAR(30)
	,	EMAIL			VARCHAR(255)
	,	CREATED_DATETIME timestamp not null default current_timestamp
	,	UPDATED_DATETIME timestamp not null default current_timestamp on update current_timestamp
	,	PRIMARY KEY (ID)
	,	INDEX(ID)
) character set utf8mb4;
###QUESTION_CATEGORY
DROP TABLE IF EXISTS QUESTION_CATEGORY;
CREATE TABLE QUESTION_CATEGORY (
		ID				INT AUTO_INCREMENT
	,	EXAM_ID			INT
	,	PARENT_QUESTION_CATEGORY INT
	,	CATEGORY_NAME	VARCHAR(255)
	,	CREATED_DATETIME timestamp not null default current_timestamp
	,	UPDATED_DATETIME timestamp not null default current_timestamp on update current_timestamp
	,	PRIMARY KEY (ID)
	,	INDEX(ID)
) character set utf8mb4;
###STUDY_HISTORY
DROP TABLE IF EXISTS STUDY_HISTORY;
CREATE TABLE STUDY_HISTORY (
		ID				INT AUTO_INCREMENT
	,	USER_ID			INT
	,	QUESTION_ID		INT
	,	RESULT			TINYINT(1)
	,	CREATED_DATETIME timestamp not null default current_timestamp
	,	UPDATED_DATETIME timestamp not null default current_timestamp on update current_timestamp
	,	PRIMARY KEY (ID)
	,	INDEX(ID)
) character set utf8mb4;
