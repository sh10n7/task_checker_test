# nodeのLTSバージョンを指定する
FROM node:16

# コンテナ内でアプリケーションのディレクトリを指定
WORKDIR /app

# 依存関係ファイルをコピー
COPY package*.json ./


# アプリケーションのソースコードをコピー
COPY . .

# パッケージのインストールとビルド
RUN npm install && \
    npm run build

EXPOSE 8080
