# Safe Code Experimentation Guide

This guide provides various methods to safely test code changes without affecting your main codebase. Perfect for experimenting with new patterns, refactoring, or trying different approaches.

## Table of Contents
- [Method 1: Git Stash (Quick Experiments)](#method-1-git-stash-quick-experiments)
- [Method 2: Experimental Branch (Feature Testing)](#method-2-experimental-branch-feature-testing)
- [Method 3: Git Worktree (Parallel Development)](#method-3-git-worktree-parallel-development)
- [Method 4: Local Backup (Simple File Recovery)](#method-4-local-backup-simple-file-recovery)
- [Best Practices](#best-practices)

## Method 1: Git Stash (Quick Experiments)

**Best for**: Quick tests, trying different approaches, temporary changes

### How to Use

1. **Save your current state**:
   ```bash
   # Save with a descriptive message
   git stash save "Before CSS custom properties experiment"
   
   # Or include untracked files
   git stash save -u "Before component refactor"
   ```

2. **Make your experimental changes**
   - Edit files freely
   - Test in development
   - Try different approaches

3. **If you DON'T like the changes**:
   ```bash
   # Discard all changes
   git checkout -- .
   
   # Restore your saved state
   git stash pop
   ```

4. **If you LIKE the changes**:
   ```bash
   # Commit your changes
   git add -A
   git commit -m "Implement new feature"
   
   # Remove the stash (no longer needed)
   git stash drop
   ```

### Useful Stash Commands
```bash
# List all stashes
git stash list

# Show what's in a stash
git stash show -p stash@{0}

# Apply specific stash without removing it
git stash apply stash@{1}

# Clear all stashes (careful!)
git stash clear
```

## Method 2: Experimental Branch (Feature Testing)

**Best for**: Larger experiments, feature development, collaborative testing

### How to Use

1. **Create experimental branch**:
   ```bash
   # Create and switch to new branch
   git checkout -b experiment/css-custom-props
   
   # Or more descriptive names
   git checkout -b experiment/button-variants
   git checkout -b experiment/new-auth-flow
   ```

2. **Make and commit changes**:
   ```bash
   # Work normally, commit as you go
   git add .
   git commit -m "Test new button variant system"
   ```

3. **If you DON'T like the changes**:
   ```bash
   # Switch back to main
   git checkout main
   
   # Delete the experimental branch
   git branch -D experiment/css-custom-props
   ```

4. **If you LIKE the changes**:
   ```bash
   # Switch to main
   git checkout main
   
   # Merge your experiment
   git merge experiment/css-custom-props
   
   # Delete the branch (optional)
   git branch -d experiment/css-custom-props
   ```

### Branch Naming Conventions
- `experiment/` - For trying new ideas
- `refactor/` - For code restructuring
- `test/` - For testing approaches
- `spike/` - For technical investigations

## Method 3: Git Worktree (Parallel Development)

**Best for**: Testing in isolation, comparing approaches side-by-side, long-running experiments

### How to Use

1. **Create a parallel working directory**:
   ```bash
   # Create new worktree with new branch
   git worktree add ../dogan-experiment experiment/new-feature
   
   # Or use existing branch
   git worktree add ../dogan-testing testing-branch
   ```

2. **Work in the new directory**:
   ```bash
   cd ../dogan-experiment
   # Make changes, test, run dev server
   # Original directory remains untouched
   ```

3. **Clean up when done**:
   ```bash
   # Remove the worktree
   cd ../dogan
   git worktree remove ../dogan-experiment
   ```

### Worktree Benefits
- Run different versions simultaneously
- Compare performance/behavior
- No need to stash/switch branches
- Keep dependencies separate

## Method 4: Local Backup (Simple File Recovery)

**Best for**: Quick file-level changes, simple rollbacks, non-git experiments

### How to Use

1. **Backup specific files**:
   ```bash
   # Single file
   cp src/app/globals.css src/app/globals.css.backup
   
   # Multiple files
   cp src/components/Button.tsx src/components/Button.tsx.backup
   cp src/components/Button.module.css src/components/Button.module.css.backup
   
   # Entire directory
   cp -r src/components src/components.backup
   ```

2. **Restore if needed**:
   ```bash
   # Restore single file
   cp src/app/globals.css.backup src/app/globals.css
   
   # Restore directory
   rm -rf src/components
   cp -r src/components.backup src/components
   ```

3. **Clean up backups**:
   ```bash
   # Remove backup files
   find . -name "*.backup" -type f -delete
   
   # Remove backup directories
   rm -rf src/components.backup
   ```

### Backup Script Example
```bash
#!/bin/bash
# backup-experiment.sh

BACKUP_DIR=".backups/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Backup specific patterns
cp src/**/*.css "$BACKUP_DIR/"
cp src/**/*.tsx "$BACKUP_DIR/"

echo "Backed up to $BACKUP_DIR"
```

## Best Practices

### 1. **Choose the Right Method**
- **Stash**: Quick, temporary experiments (< 1 hour)
- **Branch**: Feature development (hours to days)
- **Worktree**: Parallel testing (complex comparisons)
- **Backup**: Simple file changes (non-git scenarios)

### 2. **Always Start Clean**
```bash
# Check for uncommitted changes
git status

# Commit or stash existing work first
git add -A && git commit -m "WIP: Save current state"
# OR
git stash save "Current work before experiment"
```

### 3. **Document Your Experiments**
```bash
# Use descriptive names
git stash save "Experiment: Replace CSS Modules with Tailwind"
git checkout -b experiment/2024-12-15-new-auth-flow

# Add README in experimental branches
echo "# Experiment: Custom Properties for Variants" > EXPERIMENT.md
echo "## Goal: Test CSS custom properties for button variants" >> EXPERIMENT.md
echo "## Started: $(date)" >> EXPERIMENT.md
```

### 4. **Set Time Limits**
- Stash experiments: Clean up daily
- Experimental branches: Review weekly
- Worktrees: Remove after testing

### 5. **Safety Commands**
```bash
# Before any experiment
git status                    # Check current state
git diff                      # Review uncommitted changes
git log --oneline -5          # Note current commit

# Create safety checkpoint
git commit -am "Checkpoint before experiment"
git tag experiment-backup
```

## Common Scenarios

### Scenario: "I want to try a different CSS approach"
```bash
git stash save "Before CSS refactor experiment"
# Make changes, test
git checkout -- .  # Revert if bad
git stash pop      # Restore original
```

### Scenario: "I need to test a breaking change"
```bash
git checkout -b experiment/breaking-change
# Make changes, test thoroughly
git checkout main  # Back to stable
```

### Scenario: "I want to compare performance"
```bash
git worktree add ../dogan-performance-test perf-test
# Run benchmarks in both directories
git worktree remove ../dogan-performance-test
```

## Recovery Commands

If something goes wrong:

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Find lost commits
git reflog

# Recover specific file from commit
git checkout <commit-hash> -- path/to/file

# Abort merge in progress
git merge --abort

# Clean untracked files (careful!)
git clean -fd
```

---

Remember: Git almost never truly deletes anything. If you lose work, it's usually recoverable through `git reflog` or finding the right commit hash.