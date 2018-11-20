class Message < ApplicationRecord
  belongs_to :match
  belongs_to :user
  validates_presence_of :body, :match_id, :user_id
  def message_time
   created_at.strftime("%m/%d/%y at %l:%M %p")
  end
end
