class UsersController < ApplicationController

  def index
    render json: User.all
  end

  def create
    user = User.new(user_params)
    user.full_name = user.first_name + " " + user.last_name

    if user.save
      render json: user
    else 
      render :action => "new"
    end
  end

  def show
    render json: User.find_by(gid: params[:id])
  end

  def update
    user = User.find_by(gid: params[:id])
    user.update(user_params)
    render json: user
  end

  def destroy
    User.destroy(params[:id])
  end

  def places
    render json: User.find_by(gid: params[:id]).places
  end

  def find_friends
    if !params[:search_string].blank?
      search_name = params[:search_string].strip.downcase

      first_results = User.all.where("lower(first_name) LIKE :search", search: "%#{search_name}%")
      last_results = User.all.where("lower(last_name) LIKE :search", search: "%#{search_name}%")
      full_results = User.all.where("lower(full_name) LIKE :search", search: "%#{search_name}%")
      results = full_results + first_results + last_results

      render json: results.uniq[0..9]
    else
      render json: ""
    end
  end

  def friends_places
    render json: User.find_by(gid: params[:id]).find_friends_places
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :gid, :img, :email, :lat, :lng, :zip)
  end
end
