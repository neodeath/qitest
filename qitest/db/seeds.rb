# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user1 = User.create! :email =>'nickolas@gmail.com', :password => '12341234', :password_confirmation=> '12341234'
user2 = User.create! :email =>'john@gmail.com', :password => '12341234', :password_confirmation=> '12341234'
user3 = User.create! :email =>'mary@gmail.com', :password => '12341234', :password_confirmation=> '12341234'

friends1 = user1.friendships.build(:friend_id => user2.id)
friends1.save

friends1 = user1.friendships.build(:friend_id => user3.id)
friends1.save

friends2 = user2.friendships.build(:friend_id => user1.id)
friends2.save

ShareType.create! :name => 'public'
ShareType.create! :name => 'friends'