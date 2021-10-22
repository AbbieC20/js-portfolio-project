class CreatePlan < ActiveRecord::Migration[6.1]
  def change
    create_table :plans do |t|
      t.string :name
      t.date :date
      t.string :start_time # Stored as a string to get around t.time containing a date
      t.integer :duration
      t.string :notes
      t.references :calendar
      
      t.timestamps
    end
  end
end
