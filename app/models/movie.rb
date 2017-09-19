class Movie < ApplicationRecord
  has_attached_file :poster, styles: { medium: "300x300>", thumb: "100x100>" }
  validates_attachment_content_type :poster, content_type: /\Aimage\/.*\z/
  
  def img_url
    poster.url
  end
end
