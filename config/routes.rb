Rails.application.routes.draw do
  devise_for :users

  root to: 'pages#home'

  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :matches
  resources :jobs

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
