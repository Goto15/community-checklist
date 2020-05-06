class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :full_name
      t.string :email
      t.string :img
      t.string :gid
      t.integer :zip
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
