class CreateFriends < ActiveRecord::Migration[6.0]
  def change
    create_table :friends do |t|
      t.integer :friend_one_id
      t.integer :friend_two_id
      t.boolean :accepted

      t.timestamps
    end
  end
end
