class PlacesController < ApplicationController

  def index
    render json: Place.all 
  end

  def create
    place = Place.new(place_params)

    if place.save
      redirect_to place_path(place.id)
    else
      render :action => "new"
    end
  end

  def show
    render json: Place.find_by(gid: params[:id])
  end

  def update
    place = Place.find(params[:id])
    place.update(place_params)
    render json: place
  end

  def destroy
    Place.destroy(params[:id])
  end

  private

  def place_params
    params.require(:place).permit(:address, :lat, :lng, :gid)
  end
end
