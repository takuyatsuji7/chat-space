# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: flase|

### Association

has_many :users, through: :groups_users
has_many :groups_users
has_many :messages


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|mail|string|null: false, unique: true|

### Association

has_many :groups, through: :groups_users
has_many :groups_users
has_many :messages


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|group|integer|foreign_key: true|
|user|integer|foreign_key: true|

### Association

belongs_to :group
belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|-------|
|image|string|-------|
|group|integer|foreign_key: true|
|user|integer|foreign_key: true|

### Association

belongs_to :group
belongs_to :user