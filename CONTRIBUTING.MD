# Contributing to Kakunin


This section will guide you through the contribution process.

### Step 1: Fork

Fork the project [on GitHub](https://github.com/TheSoftwareHouse/Kakunin) and clone your fork
locally.

```bash
git clone git@github.com:TheSoftwareHouse/Kakunin.git
cd Kakunin
git remote add upstream https://github.com/TheSoftwareHouse/Kakunin.git
```

#### Which branch?

For developing new features and bug fixes, the `master` branch should be pulled
and built upon.


### Step 2: Branch

Create a branch and start hacking:

```bash
git checkout -b my-branch -t origin/master
```

### Step 3: Commit

Make sure git knows your name and email address:

```bash
git config --global user.name "Jan Kowalski"
git config --global user.email "jan@kowalski.com"
```

Add and commit:

```bash
$ git add my/changed/files
$ git commit
```

### Commit message guidelines

The commit message should describe what changed and why. We don't put any 
constraints on message format although it should clearly describe the change.

4. If your patch fixes an open issue, you can add a reference to it at the end
of the log. Use the `Fixes:` prefix and the full issue URL. For other references
use `Refs:`.

   Examples:
   - `Fixes: https://github.com/TheSoftwareHouse/Kakunin/issues/1337`
   - `Refs: http://eslint.org/docs/rules/space-in-parens.html`
   - `Refs: https://github.com/TheSoftwareHouse/Kakunin/pull/1234`


### Step 4: Rebase

Use `git rebase` (not `git merge`) to synchronize your work with the main
repository.

```bash
$ git fetch upstream
$ git rebase upstream/master
```

### Step 5: Test

Bug fixes and features should come with tests. Looking at other tests to 
see how they should be structured can help. 

To run the tests just run the default command:

```bash
npm test
```

Make sure the linter does not report any issues and that all tests pass. Please
do not submit patches that fail either check.


### Step 6: Push

```bash
git push origin my-branch
```

Pull requests are usually reviewed within a few days.

### Step 7: Discuss and update

You will probably get feedback or requests for changes to your Pull Request.
This is a big part of the submission process so don't be discouraged!

To make changes to an existing Pull Request, make the changes to your branch.
When you push that branch to your fork, GitHub will automatically update the
Pull Request.


Feel free to post a comment in the Pull Request to ping reviewers if you are
awaiting an answer on something. 

### Step 8: Landing

In order to land, a Pull Request needs to be reviewed and approved by
at least one Kakunin Collaborator and pass all test.
After that, as long as there are no objections from a Collaborator, 
the Pull Request can be merged.

After you push new changes to your branch, you need to get
approval for these new changes again, even if GitHub shows "Approved"
because the reviewers have hit the buttons before.

## Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

* (a) The contribution was created in whole or in part by me and I
  have the right to submit it under the open source license
  indicated in the file; or

* (b) The contribution is based upon previous work that, to the best
  of my knowledge, is covered under an appropriate open source
  license and I have the right under that license to submit that
  work with modifications, whether created in whole or in part
  by me, under the same open source license (unless I am
  permitted to submit under a different license), as indicated
  in the file; or

* (c) The contribution was provided directly to me by some other
  person who certified (a), (b) or (c) and I have not modified
  it.

* (d) I understand and agree that this project and the contribution
  are public and that a record of the contribution (including all
  personal information I submit with it, including my sign-off) is
  maintained indefinitely and may be redistributed consistent with
  this project or the open source license(s) involved.
