#Run this file with ./runMongod.sh
#nojournol because the journal file is too big
#bindip because we cant bind to 0.0.0.0
#rest runs it on port 28017
mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"