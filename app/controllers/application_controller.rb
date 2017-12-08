class ApplicationController < ActionController::Base
	protect_from_forgery with: :exception
	before_action :authenticate_user!
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
	
	# helper_method :root_path, current_user.is_admin_and_coplam?
	layout :layout_by_resource


	 def layout_by_resource
    esqueceu_a_senha = params[:controller] == 'devise/passwords'
    if devise_controller? && (resource_name == :user && action_name == 'new') or esqueceu_a_senha
      "devise"
    else
      # set_root_path
      # "application"
    end
  end

  def set_root_path
    if request.path == '/'
      # if current_user.is_admin?
      #   @root_default ||= admin_index_path
      # elsif current_user.is_coplam?
      #   @root_default ||= admin_index_path
      # elsif current_user.is_coplam_adm?
      #   @root_default ||= admin_index_path
      # elsif current_user.is_sefin?
      #   @root_default ||= loa_desdobramentos_path(@ano_trabalho)
      # elsif current_user.is_planejamento?
      #   @root_default ||= funcionais_programaticos_loa_path(ano: Loa.loas_2000.last.ano)
      # elsif current_user.is_secretario?
      #   @root_default ||= programas_path
      # elsif current_user.is_camara?
      #   @root_default ||= loa_emendas_path(@loa_atual)
      # elsif current_user.is_analista?
      #   @root_default ||= funcionais_programaticos_loa_path(ano: @ano_trabalho.ano)
      # elsif current_user.is_financeiro?
      #   @root_default ||= loa_desdobramentos_path(ano_trabalho)
      # elsif current_user.is_ceplan? or current_user.is_ceplan_adm?
      #   @root_default ||= monitoramento_ppa_indicadores_medicoes_path(@ppa_atual)
      # else
      #  @root_default ||= programas_path
      # end
      # redirect_to @root_default, flash: {alert: flash.try(:alert)}
    end
  end

   def token_authentication
    {token: ')@@(siopfor!kpmApY4X...'}
  end
end
