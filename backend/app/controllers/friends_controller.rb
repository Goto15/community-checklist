class FriendsController < ApplicationController

  def create
    f_one = User.find_by(gid: friend_params[:friend_one])
    f_two = User.find_by(gid: friend_params[:friend_two])
    ship = Friend.new(friend_one: f_one, friend_two: f_two)
    
    if ship.save
      render json: ship
    else
      render json: "You're already friends!"
    end 
  end

  private

  def friend_params
    params.require(:friend).permit(:friend_one, :friend_two)
  end

end
