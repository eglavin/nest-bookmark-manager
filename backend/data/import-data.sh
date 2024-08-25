scriptPath="$(realpath "$(dirname "$0")")"

. "$(realpath $scriptPath/../../.env)"

mongoimport \
  --uri mongodb://$DB_USERNAME:$DB_PASSWORD@127.0.0.1:27017/nest?authSource=admin \
  --collection bookmarks \
  --type json \
  --jsonArray \
  --file "$scriptPath/bookmarks.json"

mongoimport \
  --uri mongodb://$DB_USERNAME:$DB_PASSWORD@127.0.0.1:27017/nest?authSource=admin \
  --collection categories \
  --type json \
  --jsonArray \
  --file "$scriptPath/categories.json"
