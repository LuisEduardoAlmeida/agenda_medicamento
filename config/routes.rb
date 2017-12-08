Rails.application.routes.draw do
  resources :doctors
  resources :providers
  resources :reminders
  root to: "doctors#index"

  # Below for all other routes:
  devise_for :users, skip: ['registration']
   as :user do
    get 'users/edit'      => 'devise/registrations#edit',   :as => 'edit_user_registration'
    put 'users'           => 'devise/registrations#update', :as => 'user_registration'

    get 'users'           => 'registrations#index',         :as => 'index_user_registration_custom'
    get 'users/new'       => 'registrations#new',           :as => 'new_user_registration_custom'
    post 'users'          => 'registrations#create',        :as => 'user_registration_custom'
    get 'users/edit/:id'  => 'registrations#edit',          :as => 'edit_user_registration_custom'
    put 'users/update/:id'=> 'registrations#update',        :as => 'update_user_registration_custom'
    # delete 'users/:id'    => 'registrations#destroy',       :as => 'user'

    # get 'users/:id/bloquear'    => 'registrations#bloquear',          :as => 'bloquear_user_registration_custom'
    # get 'users/:id/desbloquear' => 'registrations#desbloquear',       :as => 'desbloquear_user_registration_custom'

  end
  
  resources :users
    
  # put 'users/:id/perfil/:perfil_id'         => 'users#update_unorc', :as => 'update_unorc'
  put 'users/:id/change_unorc'              => 'users#change_unorc', :as => 'change_unorc'
  post 'users/change_unorc_list_unorcs'     => 'users#change_unorc_list_unorcs', :as => 'change_unorc_list_unorcs'
  put 'users/:id/change_perfil'             => 'users#change_perfil', :as => 'change_perfil'
  get 'users/:id/reset_password'            => 'users#reset_password',:as => 'resetar_senha'
  get 'users/:id/auditoria_user'            => 'users#auditoria_user',:as => 'auditoria_user'
  put 'users/:id/change_ano'             => 'users#change_ano', :as => 'change_ano'


  resources :admin do
    collection do
      get :checkup
      get :execucao_fonte
      get :execucao_fonte_index
      get :loa_gd_chart
    end
  end
  # get 'users/auditoria', to: 'users#auditoria', as: 'auditoria'


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
