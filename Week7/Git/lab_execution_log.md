# Git Hands-on Labs Execution Log (Week7/Git)

This document records the step-by-step execution results for all 5 hands-on lab PDFs located under `Week7/Git`.

---

## Lab 1: Setup Git & Repository Initialization (PDF 5)

### Objectives
- Setup Git configuration (`user.name`, `user.email`, `core.editor`)
- Create and initialize repository `GitDemo`
- Create `welcome.txt`, stage, commit, and verify working directory state.

### Execution Log & Commands
1. **Git Version & Configuration Check**:
   ```bash
   git version
   # Output: git version 2.51.0.windows.1
   
   git config --global user.name "Poovizhivm"
   git config --global user.email "poovizhivm@gmail.com"
   git config --global --list
   ```

2. **Initialize `GitDemo` Repository**:
   ```bash
   git init -b master GitDemo
   # Initialized empty Git repository in C:/DN5-Java-FSE-React/Week7/Git/GitDemo/.git/
   cd GitDemo
   ```

3. **Directory Verification & File Creation**:
   ```bash
   ls -al (Get-ChildItem -Force)
   # Displays .git directory
   
   Set-Content -Path welcome.txt -Value "Welcome to the version control"
   Get-Content welcome.txt
   # Output: Welcome to the version control
   ```

4. **Staging & Commit**:
   ```bash
   git status
   # Untracked files: welcome.txt
   
   git add welcome.txt
   git commit -m "Initial commit: Add welcome.txt"
   # [master (root-commit) 597c704] Initial commit: Add welcome.txt
   
   git status
   # On branch master, nothing to commit, working tree clean
   ```

---

## Lab 2: Branching and Merging (PDF 4)

### Objectives
- Create branch `GitNewBranch`
- Add files on branch and commit
- Inspect differences with master
- Merge `GitNewBranch` into master and delete branch

### Execution Log & Commands
1. **Branch Creation & Checkout**:
   ```bash
   git branch GitNewBranch
   git branch -a
   #   GitNewBranch
   # * master
   
   git checkout GitNewBranch
   Set-Content -Path feature.txt -Value "New feature content in GitNewBranch"
   git add feature.txt
   git commit -m "Add feature.txt in GitNewBranch"
   ```

2. **Switch to Master & Diff**:
   ```bash
   git checkout master
   git diff master..GitNewBranch
   # diff --git a/feature.txt b/feature.txt
   # +New feature content in GitNewBranch
   ```

3. **Merge & Clean Up**:
   ```bash
   git merge GitNewBranch
   # Fast-forward merge: feature.txt | 1 +
   
   git log --oneline --graph --decorate
   # * ad16773 (HEAD -> master, GitNewBranch) Add feature.txt in GitNewBranch
   # * 597c704 Initial commit: Add welcome.txt
   
   git branch -d GitNewBranch
   git branch -a
   # * master
   ```

---

## Lab 3: Git Ignore (PDF 3)

### Objectives
- Ignore unwanted files and directories (`.log` extension and `log/` folder)
- Configure `.gitignore` and verify status

### Execution Log & Commands
1. **Create Log Files & Folders**:
   ```bash
   Set-Content -Path app.log -Value "Log entry 1"
   New-Item -ItemType Directory -Path log -Force
   Set-Content -Path log\server.log -Value "Server log entry 1"
   
   git status
   # Untracked files: app.log, log/
   ```

2. **Configure `.gitignore`**:
   ```bash
   Set-Content -Path .gitignore -Value "*.log`nlog/"
   git status
   # Untracked files: .gitignore (app.log and log/ are ignored)
   
   git add .gitignore
   git commit -m "Add .gitignore for .log files and log folder"
   git status
   # On branch master, nothing to commit, working tree clean
   ```

---

## Lab 4: Merge Conflict Resolution - Git-T03-HOL_001 (PDF 2)

### Objectives
- Create branch `GitWork` with conflicting file `hello.xml`
- Trigger merge conflict with master
- Inspect conflict markup and perform resolution
- Commit resolved merge, ignore backup files (`*.orig`), and delete branch `GitWork`.

### Execution Log & Commands
1. **Create Branch `GitWork` & Add `hello.xml`**:
   ```bash
   git checkout -b GitWork
   Set-Content -Path hello.xml -Value "<greetings><msg>Hello from GitWork branch</msg></greetings>"
   git add hello.xml
   git commit -m "Add hello.xml on GitWork branch"
   ```

2. **Switch to Master & Add Conflicting `hello.xml`**:
   ```bash
   git checkout master
   Set-Content -Path hello.xml -Value "<greetings><msg>Hello from master branch</msg></greetings>"
   git add hello.xml
   git commit -m "Add hello.xml on master branch"
   
   git log --oneline --graph --decorate --all
   git diff master GitWork
   ```

3. **Merge Conflict Generation & Resolution**:
   ```bash
   git merge GitWork
   # CONFLICT (add/add): Merge conflict in hello.xml
   # Automatic merge failed; fix conflicts and then commit the result.
   
   # Conflict Markup in hello.xml:
   # <<<<<<< HEAD
   # <greetings><msg>Hello from master branch</msg></greetings>
   # =======
   # <greetings><msg>Hello from GitWork branch</msg></greetings>
   # >>>>>>> GitWork

   # Resolved hello.xml Content:
   # <greetings>
   #   <msg>Hello from master branch</msg>
   #   <msg>Hello from GitWork branch</msg>
   # </greetings>
   
   git add hello.xml
   git commit -m "Merge branch 'GitWork' into master - resolved conflict in hello.xml"
   ```

4. **Ignore Backup Files & Delete Branch**:
   ```bash
   Add-Content -Path .gitignore -Value "`n*.orig"
   git add .gitignore
   git commit -m "Add *.orig backup file pattern to .gitignore"
   
   git branch -d GitWork
   # Deleted branch GitWork (was 43f2f93).
   
   git log --oneline --graph --decorate
   ```

---

## Lab 5: Clean Up and Push Back to Remote Git - Git-T03-HOL_002 (PDF 1)

### Objectives
- Verify clean state of master
- Set up remote tracking origin
- Perform `git pull` and `git push` operations
- Verify remote repository synchronization

### Execution Log & Commands
1. **Setup Remote Bare Repository**:
   ```bash
   git init --bare c:\DN5-Java-FSE-React\Week7\Git\GitDemo-remote.git
   git remote add origin c:/DN5-Java-FSE-React/Week7/Git/GitDemo-remote.git
   git push -u origin master
   # branch 'master' set up to track 'origin/master'.
   ```

2. **Pull and Push Pending Changes**:
   ```bash
   Set-Content -Path README.md -Value "# GitDemo Lab Repository"
   git add README.md
   git commit -m "Add README.md for Git-T03-HOL_002"
   
   git pull origin master
   # Already up to date.
   
   git push origin master
   # To c:/DN5-Java-FSE-React/Week7/Git/GitDemo-remote.git
   #    b8b2e8a..baf3c10  master -> master
   ```

3. **Verify Synchronized State**:
   ```bash
   git log origin/master --oneline --graph --decorate
   # * baf3c10 (HEAD -> master, origin/master) Add README.md for Git-T03-HOL_002
   # * b8b2e8a Add *.orig backup file pattern to .gitignore
   # * e1f2a0e Merge branch 'GitWork' into master - resolved conflict in hello.xml
   
   git status
   # On branch master
   # Your branch is up to date with 'origin/master'.
   # nothing to commit, working tree clean
   ```
