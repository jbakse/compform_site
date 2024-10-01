# Step 1: Add the upstream remote (if not already done)

git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git

# Step 2: Fetch the latest changes from the upstream repository

git fetch upstream
or
git fetch --all

# Step 3: Switch to your feature branch

git checkout feature-branch

# Step 4: Merge the upstream feature branch into your local feature branch

git merge --ff-only upstream/feature-branch
or
git merge upstream/feature-branch
or
git rebase upstream/feature-branch

# Step 5: Push the updated feature branch to your fork

git push origin feature-branch
or
git push --force-with-lease origin feature-branch

see also:
https://gist.github.com/CristinaSolana/1885435
https://medium.com/swlh/forks-and-pull-requests-how-to-contribute-to-github-repos-8843fac34ce8

git remote -v
git branch -a
