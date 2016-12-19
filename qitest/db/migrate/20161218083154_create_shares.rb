class CreateShares < ActiveRecord::Migration
  def change
    create_table :shares do |t|
      t.integer :user_id
      t.integer :share_type_id
      t.point :lonlat, geographic: true
      t.timestamps
    end
  end
end
