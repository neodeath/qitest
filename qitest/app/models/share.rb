class Share < ActiveRecord::Base
  belongs_to :share_type, :class_name => "ShareType"
  belongs_to :user
end
