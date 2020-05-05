require 'nokogiri'
require 'open-uri'


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
      place.img = ''
      puts '=============================='
      begin
        page = Nokogiri::HTML(open(place.website).read)
        ogImg = page.css("meta[property='og:image']")
        place.img = ogImg[0]['content']
      rescue Exception => e # Never do this!
        print e
      end
      puts place.img
      puts '=============================='
      place.save
    end

    UserPlace.create(user_id: user.id, place_id: place.id, visited: params[:visited], notes: params[:notes])
    redirect_to place_path(place.id)
  end

  def destroy
    up = UserPlace.find(params[:id])
    render json: up.destroy
  end

  def places
    user = User.find_by(gid: params[:id])
    userPlaces = UserPlace.where(user_id: user.id)
  
    places = userPlaces.map do |up|

      place = Place.find(up.place_id)

      placeNotes = {
        address: place.address,
        phone: place.phone,
        lat: place.lat,
        lng: place.lng,
        img: place.img,
        name: place.name,
        gid: place.gid,
        website: place.website,
        notes: up.notes,
        visited: up.visited,
        upid: up.id
      }

      placeNotes
    end

    render json: places 
  end
end
