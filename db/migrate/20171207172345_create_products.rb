class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :description
      t.references :provider, foreign_key: true
      t.integer :sale_price
      t.integer :purchase_price
      t.integer :stock
      t.integer :minimum_stock
      t.string :exempt
      t.integer :category_id
      t.integer :discount

      t.timestamps
    end
  end
end
