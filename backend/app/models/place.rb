class Place < ApplicationRecord
  has_many :user_places
  has_many :users, through: :user_places
  has_many :lists

  validates :gid, uniqueness: true
end
