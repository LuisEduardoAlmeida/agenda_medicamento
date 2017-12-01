class CreateReminders < ActiveRecord::Migration[5.1]
  def change
    create_table :reminders do |t|
      t.string :name
      t.time :time
      t.integer :days
      t.date :start_at

      t.timestamps
    end
  end
end
