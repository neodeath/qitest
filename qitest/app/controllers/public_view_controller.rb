class PublicViewController < ApplicationController
  def userpage
  	  
  	  # user page which the public can view the public shares
  	  @email = params[:id]
  	  @public_shares = SharesController.get_all_public_shares(@email)
  end
end
