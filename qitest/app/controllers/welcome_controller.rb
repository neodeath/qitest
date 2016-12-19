class WelcomeController < ApplicationController
  # this page requires authentication
  before_action :authenticate_user!
  def homepage
  	# user page which i can view my friends shares and my own shares
  	@share_type_names = ShareType.all.pluck("name")
  	@user_id = current_user.id
  	@all_my_shares = SharesController.get_all_public_and_friends_shares(@user_id)
  end
end
