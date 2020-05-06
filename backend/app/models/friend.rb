class Friend < ApplicationRecord
  belongs_to :friend_one, class_name: "User"
  belongs_to :friend_two, class_name: "User"

  validates :friend_one, presence: true
  validates :friend_two, presence: true

  validates :friend_one_id, uniqueness: {scope: :friend_two_id}
end
