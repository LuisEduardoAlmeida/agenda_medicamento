# Be sure to restart your server when you modify this file.
if Rails.env.production?
  AgendaMedicamento::Application.config.session_store :cookie_store, key: '_agenda_medicamento_session', domain: '178.62.63.159/'
elsif Rails.env.homologacao?
 AgendaMedicamento::Application.config.session_store :cookie_store, key: '_agenda_medicamento_session_dev', domain: '178.62.63.159/'
elsif Rails.env.development?
  AgendaMedicamento::Application.config.session_store :cookie_store, key: '_agenda_medicamento_session_dev', domain: :all
end
