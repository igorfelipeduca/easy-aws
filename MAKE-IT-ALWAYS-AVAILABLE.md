## Prerequisites

- Ubuntu server with Docker and Docker Compose installed.

## Steps

### 1. Install Docker and Docker Compose

Ensure Docker and Docker Compose are installed on your Ubuntu server:

# Install Docker (if not already installed)
sudo apt-get update
sudo apt-get install docker-ce

### Create the systemd Service File
1.Navigate to the systemd directory:
```bash
cd ~
```
2. Create a new service file for your Docker Compose application:
```bash
sudo nano docker-compose-app.service
``` 

3. Paste the following configuration into the file:
```ini
[Unit]
Description=Node.js Application with Docker Compose
Requires=docker.service
After=docker.service

[Service]
WorkingDirectory=/path/to/your/nodejs/app
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
Restart=always

[Install]
WantedBy=multi-user.target

```

> [!WARNING]
> Make sure the Working Directory, ExecStart and ExecStop match with your app paths 


### Manage the systemd Service
```bash
sudo systemctl daemon-reload
sudo systemctl enable docker-compose-app
sudo systemctl start docker-compose-app
```

### Verify Service Status
```bash
sudo systemctl status docker-compose-app
```

