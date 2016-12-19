class CreateShareTypes < ActiveRecord::Migration
  def change
    create_table :share_types do |t|
      t.string :name

      t.timestamps
    end
  end
end
