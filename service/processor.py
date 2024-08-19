

import re
import math
import numpy as np
from underthesea import word_tokenize

class SearchEngine():
 def search(query, web_collection):
  documents = []
  urls= []

  # get document from db
  for data in web_collection.find():
    print(data)
    content = data.get('content')
    url = data.get('url')
    if url:
      urls.append(url)
    if content:
      documents.append(content)

  print(documents)
  # Loại bỏ các dấu câu trong Tập dữ liệu
  documents = [re.sub('\W+',' ', doc) for doc in documents] 

  # Lấy độ dài của documents
  documents_length = len(documents)

  print(enumerate(documents))
  # Lấy các stopwords từ file vietnamese-stopwords.txt và append vào stopwords
  path_to_stopwords_txt = './stopwords/vietnamese-stopwords.txt'
  stopwords = []
  with open(path_to_stopwords_txt, 'r', encoding='utf-8') as f:
    for line in f:
      line = line.strip()
      stopwords.append(line)

  stopwords = [word.replace(' ', '_') for word in stopwords]
  print("stopwords: %s", stopwords)
  # Xây dựng tập từ vựng (V) dạng cấu trúc chỉ mục ngược
  # (V) là cấu trúc dữ liệu dạng dictionary <key: token_1, value: [(doc_idx_1, tf(token_1)), (doc_idx_2, tf(token_1)), v.v.>
  inverted_index = {}

  # Chúng cũng cần xác định trọng số lớn nhất của từ xuất hiện trong mỗi tài liệu/văn bản để cập nhật lại tf
  # Cấu trúc dữ liệu dạng dictionary <key: doc_idx, value: <key: token, value: token_freq>>
  doc_idx_token_token_freq = {}

  # Tiến hành duyệt qua từng văn bản để xây dựng tập từ vựng
  for doc_idx, doc in enumerate(documents):
     # Tiến hành dùng thư viện UnderTheSea để tách các từ/token trong tiếng Việt
    tokens = word_tokenize(doc.lower())
    # Tiến hành thay thế các khoảng trắng ' ' trong các từ ghép thành '_'
    tokens = [token.replace(' ', '_') for token in tokens]

    # Duyệt qua từng token
    for token in tokens:
      if token not in stopwords:
        # Kiểm tra xem token đã tồn tại trong tập từ vựng (V) hay chưa
        if token not in inverted_index.keys():
          inverted_index[token] = [(doc_idx, 1)]
        else:
          # Kiểm tra xem tài liệu doc_idx đã có trong danh sách các tài liệu chỉ mục ngược của token này hay chưa
          is_existed = False
          for inverted_data_idx, (target_doc_idx, target_tf) in enumerate(inverted_index[token]):
            if target_doc_idx == doc_idx:
              # Tăng tần số xuất hiện của token trong tài liệu (target_doc_idx) lên 1
              target_tf+=1
              # Cập nhật lại dữ liệu
              inverted_index[token][inverted_data_idx] = (target_doc_idx, target_tf)
              is_existed = True
              break
          # Trường hợp chưa tồn tại
          if is_existed == False:
            inverted_index[token].append((doc_idx, 1))
          if doc_idx not in doc_idx_token_token_freq.keys():
            doc_idx_token_token_freq[doc_idx] = {}
            doc_idx_token_token_freq[doc_idx][token] = 1
          else:
            if token not in doc_idx_token_token_freq[doc_idx].keys():
              doc_idx_token_token_freq[doc_idx][token] = 1
            else:
              doc_idx_token_token_freq[doc_idx][token] += 1

  print('inverted_index', inverted_index)
  # Hàm tìm từ khóa/token xuất hiện nhiều nhất trong một tài liệu/văn bản (doc_idx)
  def find_max_freq_token(doc_idx):
    max_freq_token = ''
    max_freq = 0
    for token in doc_idx_token_token_freq[doc_idx].keys():
      if doc_idx_token_token_freq[doc_idx][token] > max_freq:
        max_freq_token = token
        max_freq = doc_idx_token_token_freq[doc_idx][token]
    return (max_freq_token, max_freq)

  # Cấu trúc dữ liệu dạng dictionary <key: doc_idx, value: (max_freq_token, max_freq)>
  doc_idx_max_freq_token = {}
  for doc_idx, doc in enumerate(documents):
    doc_idx_max_freq_token[doc_idx] = find_max_freq_token(doc_idx)

  print('doc_idx_max_freq_token', doc_idx_max_freq_token)
  # Cập nhật lại tf của từng token trong danh sách các tài liệu/văn bản chỉ mục ngược
  for token in inverted_index.keys():
    D_t = inverted_index[token]
    for inverted_data_idx, (doc_idx, tf) in enumerate(D_t):
      # Cập nhật lại trọng số tf của token đang xét
      (max_freq_token, max_freq) = doc_idx_max_freq_token[doc_idx]
      update_tf = tf / max_freq
      # Cập nhật lại dữ liệu
      inverted_index[token][inverted_data_idx] = (doc_idx, update_tf)
  for token in inverted_index.keys():
   print(token, '->', inverted_index[token])


  seperate_query = word_tokenize(query.lower())
  seperate_query = [token.replace(' ', '_') for token in seperate_query]
  print("seperate_query", seperate_query)

  document_scores = {}

  for token in seperate_query:
      if token in inverted_index:
        print(token)
        # Lấy ra danh sách các tài liệu/văn bản mà từ vựng này xuất hiện
        D_t = inverted_index[token]
        print(D_t)
        # Từ đó, ta xác định được doc_freq (df)
        doc_freq = len(D_t)

        for (doc_idx, tf) in D_t:
          idf = math.log((documents_length / doc_freq), 2)
          tfidf = tf * idf
          
          if doc_idx in document_scores:
              document_scores[doc_idx] += tfidf
          else:
              document_scores[doc_idx] = tfidf

  # Sắp xếp các tài liệu theo điểm số từ cao đến thấp
  sorted_documents = sorted(document_scores.items(), key=lambda doc: doc[1], reverse=True)

  arr = []
  # In ra danh sách các tài liệu cùng với điểm số TF-IDF của chúng
  for doc_idx, score in sorted_documents:
      if urls[doc_idx] not in arr:
        arr.append(urls[doc_idx])
      print(f"Tài liệu {doc_idx} có điểm số TF-IDF: {score}")

  return arr