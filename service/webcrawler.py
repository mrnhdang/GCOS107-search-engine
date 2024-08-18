import requests
from bs4 import BeautifulSoup

# Chiều sâu duyệt tối đa của mỗi URL
MAX_DEPTH = 3

class WebCrawler:
 def insert(url, web_collection):
  # Viết hàm đệ quy để tiến hành quét qua các URLs trong tập seeds theo
  def fetch_by_dfs(base, path, visited, max_depth=MAX_DEPTH, depth=0):
      # Kiểm tra xem chiều sâu hiện tại đã vượt quá [MAX_DEPTH] hay chưa
      if depth < max_depth:
          try:
              # Tải nội dung ở định dạng <html> của webpage hiện tại đang đứng
              # Ở bước này chúng ta có thể lưu nội dung của website vào CSDL để phục vụ cho việc chỉ mục sau này
              html_content = BeautifulSoup(requests.get(base + path).text, "html.parser")

              # Step 3: Extract the text from the parsed HTML
              text = html_content.get_text()

              # Step 4: Optionally clean up the text (e.g., remove extra whitespaces)
              clean_text = ' '.join(text.split())

              # # Output the clean text
              # print(clean_text)
              print(base)
              payload = { 'url': base, 'content': clean_text  }
              exist_data = web_collection.find(payload)
              if exist_data is None:
               web_collection.insert_one(payload)
              
              # Lấy toàn bộ các thẻ <a> là các thẻ chứa hyper-links (href) của webpage đang đứng
              a_tags = html_content.find_all("a")
              # print(a_tags)
              
              # Duyệt qua từng hyper-links của webpage đang có
              for link in a_tags:

                  # Lấy ra đường dẫn liên kết trong attribute [href]
                  href = link.get("href")

                  # Kiểm tra xem đường dẫn này chúng ta đã duyệt qua hay chưa? thông qua đối chiếu trong danh sách [visited]
                  if href not in visited:
                      # Nếu chưa duyệt qua tiến hành bỏ hyper-link này vào [visited]
                      visited.append(href)
                      # print('Chiều sâu (depth) hiện tại: [{}/{}] - duyệt URL: [{}], '. format(depth, max_depth, href))

                      # Kiểm tra xem đường dẫn này có phải là một đường dẫn hợp lệ - bắt đầu bằng http, ví dụ: https://vnexpress.net
                      if href.startswith("http"):
                          # Nếu hợp lệ - tiến hành gọi đệ quy hàm [fetch_by_dfs] duyệt hyper-link đang xét và tăng chiều sâu [depth] lên 1
                          fetch_by_dfs(href, "", visited, max_depth, depth + 1)
                      else:
                          # Nếu không hợp lệ thì tiếp tục quay lại hyper-link cha [base] và duyệt các hyper-links kế cạnh theo chiều ngang - tăng chiều sâu [depth] lên 1
                          fetch_by_dfs(base, href, visited, max_depth, depth + 1)
          except Exception as ex:
            print(ex)
            pass
      
  # Danh sách các URL đã truy cập
  visited = []
  # Duyệt qua từng URL có trong tập seeds
  for link in url:
    # Bỏ url này vào danh sách [visited]
    visited.append(link)
    fetch_by_dfs(link, "", visited) 
