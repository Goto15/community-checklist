class UsersController < ApplicationController

  def index
    render json: User.all
  end

  def create
    user = User.new(user_params)

    if user.save
      redirect_to user_path(user.id)
    else 
      render :action => "new"
    end
  end

  def show
    render json: User.find_by(gid: params[:id])
  end

  def update
    user = User.find(params[:id])
    user.update(user_params)
    render json: user
  end

  def destroy
    User.destroy(params[:id])
  end

  def places
    render json: User.find_by(gid: params[:id]).places
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :gid, :img, :email)
  end
end
