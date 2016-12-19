class SharesController < ApplicationController
	# function to create new shares via the params
	def create
		new_share = Share.new
		new_share.user_id = params["id"]

		new_share.share_type_id = ShareType.where(:name=>params[:type]).first.id
		new_share.lonlat = RGeo::Cartesian.factory(:srid => 4326).point(params["latlong"][0],params["latlong"][1])
		new_share.save

		# return a valid response to ajax, which require it to be a valid json
		respond_to do |format|		
			format.json {render :json => {}}
		end
	end

	# function to return all shares and shared from friends
	def self.get_all_public_and_friends_shares(id)
		
		all_shares = []
		#get my own shares
		all_shares = all_shares + User.find_by_id(id).shares.to_a
		
		#get all my friends shares
		User.find_by_id(id).friends.each do |friend|
			all_shares = all_shares + friend.shares.to_a
		end
		all_shares
	end

	# function to get shares which the public can see
	def self.get_all_public_shares(email)
		
		public_id = ShareType.find_by_name("public").id
		User.find_by_email(email).shares.where(:share_type_id=>public_id).to_a
	end
end