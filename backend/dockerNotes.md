# ===============================
# 🐧 WSL + Docker + Judge0 Setup Notes
# ===============================

## Step 1: Open Ubuntu via WSL

1. First, open **Windows PowerShell** as Administrator.
2. Then use either of the following commands:

   - `wsl -d Ubuntu` → Launch a specific distro (Ubuntu)
   - `wsl` → If Ubuntu is set as the default

---

## Step 2: Access Docker Configuration

From Ubuntu terminal:

```bash
cd ~/.docker         # Step 1: Go to Docker config directory
nano config.json     # Step 2: Edit Docker config if needed

## 🔄 Start Docker Containers (Judge0 + Custom)


Run the following command to start all required containers:

y`docker start judge0-v1131_server_1 judge0-v1131_workers_1 judge0-v1131_db_1  judge0-v1131_redis_1 codelearner`