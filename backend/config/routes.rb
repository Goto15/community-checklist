Rails.application.routes.draw do

  resources :users
  resources :places
  resources :user_places, only: [:create, :index, :destroy]
  resources :lists
  resources :friends, except: [:index]
  resources :types
  resources :place_types

  get '/users/:id/places', to: 'user_places#places'
  get '/search/users/:search_string', to: 'users#find_friends'

end
