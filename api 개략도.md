## 게시글 리스트

### /post/all

### session

유저 아이디: number

### get

### res

{
작성자 이름
이메일
내용
이미지
작성날짜
조회수
댓글수
좋아요수
게시글 아이디
}[]

## 게시글 리스트 필터

### /post/filter

### get

### session

유저 아이디: number

### query

type: own, notification
list: posts,replies,likes

### res

{
작성자 이름
이메일
내용
이미지
조회수
댓글수
좋아요수
게시글 아이디
}[]

## 특정 게시글 전체보기

### /post/(post_id)

### get

### res

{
작성자 이름
이메일
내용
이미지
작성날짜
조회수
댓글수
좋아요수
게시글 아이디
댓글[]
}

댓글:
{
작성자
이메일
내용
댓글수
좋아요수
조회수
대댓글(댓글)[]
}

## 게시글 좋아요

### /post/(post_id)/like

### post

### session

유저 아이디: number

## 글 작성

### /post/(post_id)/reply

### post

### session

유저 아이디: number

### query

reply_id: number

### body

내용
이미지: File

## 유저 정보

### /user

### get

### session

유저 아이디: number

### res

유저 아이디: number
이름
이메일

## 유저 필터

### /user/filter

### get

### query

name: 유저 이름

### res

유저 아이디: number
유저 이름
유저 이메일

## 유저 회원가입

### /user/regist

### post

### body

이메일
이름
비밀번호

## 유저 로그인

### /user/login

### post

### body

아이디\_문자열
비밀번호
