class User < ApplicationRecord
  has_many :user_places
  has_many :places, through: :user_places
  has_many :friends
  has_many :lists

  validates :email, uniqueness: true
  validates :gid, uniqueness: true
end
