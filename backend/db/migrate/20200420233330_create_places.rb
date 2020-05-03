class CreatePlaces < ActiveRecord::Migration[6.0]
  def change
    create_table :places do |t|
      t.string :address
      t.string :phone
      t.float :lat
      t.float :lng
      t.string :name
      t.string :gid
      t.string :website

      t.timestamps
    end
  end
end
