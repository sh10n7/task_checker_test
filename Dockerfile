# nodeのLTSバージョンを指定する
FROM node:16

# # コンテナ内でアプリケーションのディレクトリを指定
WORKDIR /app

# 依存関係ファイルをコピー
COPY package*.json ./

# アプリケーションのソースコードをコピー
COPY . .

# パッケージのインストール
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]