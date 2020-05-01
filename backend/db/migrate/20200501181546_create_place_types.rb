class CreatePlaceTypes < ActiveRecord::Migration[6.0]
  def change
    create_table :place_types do |t|
      t.integer :place_id
      t.integer :type_id
      
      t.timestamps
    end
  end
end
