class User < ApplicationRecord
  has_many :user_places
  has_many :places, through: :user_places
  has_many :friends
  has_many :lists

  validates :email, uniqueness: true
  validates :gid, uniqueness: true

  def friends
    if Friend.where(:friend_one => self.id)
      friends = Friend.where(friend_one: self.id).or(Friend.where(friend_two: self.id))
    end

    friends = friends.map do |friend|
      if friend.friend_one != self
        friend = friend.friend_one
      else 
        friend = friend.friend_two
      end
    end

    friends
  end

  def find_friends_places
    self.friends.map do |friend| 
      {
        friend: friend,
        places: friend.places 
      }
    end
  end
end
