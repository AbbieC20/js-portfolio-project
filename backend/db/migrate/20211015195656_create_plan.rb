class CreatePlan < ActiveRecord::Migration[6.1]
  def change
    create_table :plans do |t|
      t.string :name
      t.integer :duration
      t.string :notes
      t.datetime :start_time
      t.references :calendar
      
      t.timestamps
    end
  end
end
