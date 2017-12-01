json.extract! reminder, :id, :name, :time, :days, :start_at, :created_at, :updated_at
json.url reminder_url(reminder, format: :json)
