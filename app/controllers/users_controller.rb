class UsersController < ApplicationController
  def index
    # @usuarios = User.accessible_by(current_ability).includes(unidades_orcamentarias: :orgao).where(last_sign_in_at: ((DateTime.now-6.month)..DateTime.now)).order(:id)
    @user = User.all.order(:id)
  end
  def delete
    
  end
end
