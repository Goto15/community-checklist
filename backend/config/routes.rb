Rails.application.routes.draw do

  resources :users, except: [:index]
  resources :places
  resources :user_places, only: [:create, :index]
  resources :lists
  resources :friends, except: [:index]
  resources :types
  resources :place_types

  get '/users/:id/places', to: 'users#places'

end
