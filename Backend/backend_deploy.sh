#!/bin/bash 
set -e
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash && export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
# This loads nvm 

[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 
# This loads nvm bash_completion 

nvm install 18.18.2 
nvm use --delete-prefix 18.18.2 

export PATH="$HOME/.npm-packages/bin:$PATH" 
npm install --force --verbose --unsafe-perm
bn 
export NODE_OPTIONS=--max_old_space_size=8192 ng build --configuration=production 

cd vite_project/Backend
npm i 

nodemon server.js