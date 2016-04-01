#Sets up mongod. Only needs to be run once. 
#Run this file with ./setupMongod.sh
#nojournol because the journal file is too big
#bindip because we cant bind to 0.0.0.0
#rest runs it on port 28017
echo "Setting up mongod..."
mkdir data
echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
chmod a+x mongod
echo "Mongod is ready! Run 'mongod' to start it!"