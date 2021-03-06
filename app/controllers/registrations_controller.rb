class RegistrationsController < Devise::RegistrationsController

  private

  def sign_up_params
    params.require(:user).permit(:name, :password, :email, :company, :photo, :banner)
  end

  def account_update_params
    params[:user][:company] = params[:user][:company] == "1"
    params.require(:user).permit(:name, :current_password, :password, :password_confirmation, :address, :area_of_influence, :skill, :rate, :about_me, :certificates, :experience, :photo, :company, :banner)
  end

  def after_sign_up_path_for(resource_or_scope)
    Job.create!(title: "Query", location: "London, England", skill: "not specified", user_id: current_user.id, start_date: Date.today, end_date: Date.today)
    user_path(current_user)
  end

  def after_update_path_for(resource_or_scope)
    user_path(current_user)
  end

  def update_resource(resource, params)
    resource.update_without_password(params)
  end
end
