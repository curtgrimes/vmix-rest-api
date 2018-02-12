# vMix REST API

## Installation
1. Change the vmix path in app/index.js (TODO: use environment variable)
1. Build: `docker build . -t vmix-rest-api`
1. Set environment variable `VMIX_PATH` to something like `http://10.211.55.6:8088/api`
1. Run locally on port 3000: `docker run -it -p 3000:3000 -d vmix-rest-api`
1. Go to http://localhost:3000