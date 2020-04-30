class UserPlacesController < ApplicationController

  def index
    render json: UserPlace.all
  end

  def create
    user = User.find_by(gid: params[:user_gid])
    place = Place.find_by(gid: params[:place_gid])
    
    if place == nil
      place = Place.new()
      place.address = params[:address]
      place.phone = params[:phone]
      place.lat = params[:lat]
      place.lng = params[:lng]
      place.name = params[:name]
      place.gid = params[:place_gid]
      place.website = params[:website]
      place.save
    end

    UserPlace.create(user_id: user.id, place_id: place.id, visited: params[:visited])
    redirect_to place_path(place.id)
  end
end
