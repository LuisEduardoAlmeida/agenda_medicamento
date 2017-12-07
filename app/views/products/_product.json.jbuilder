json.extract! product, :id, :description, :provider_id, :sale_price, :purchase_price, :stock, :minimum_stock, :exempt, :category_id, :discount, :created_at, :updated_at
json.url product_url(product, format: :json)
