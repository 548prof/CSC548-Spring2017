# CSC548-Spring2017

A collaboration repository for students in Dr. Rieksts' CSC 548 class.

# Mini Git Tutorial

The terms you want to be most familiar with for what you'll be doing are:

**clone** - Getting the repository for the first time. Only doing this once.

**pull** - Apply changes made to the remote repository to your working
repository.

**push** - Apply changes made to your working repository to the remote
repository.

**commit** - Mark the changes you've made as a checkpoint.

**merge** - Combine changes you've made to another branch.

For the most part, you're only expected to make changes within your own
directory in the repository. This should avoid any merge conflicts, which take a
little time to master, and even then mistakes can still be easily made. If you
do encounter a merge conflict and don't know how to resolve it, feel free to
contact Andrew Wernicki, whose information can be found below.

This tutorial was written with the intention of running git from the CSIT
machine, however, the steps for doing this in git bash and from the Windows
command prompt will be very similar.

First you want to set up your git info. Run these commands on acad:

`git config --global user.name "Your Name here"`

`git config --global user.email "your_email@domainname.com"`

Obviously your name is your name, and you can use whatever email you want. This
is just for helping to track the authors of commits.

# Cloning

Next thing you'll want to do is clone the repository. This will be the shared
parent directory that contains all of the student subdirectories. Where you run
this command is where it will create the directory containing the repository. I
ran this from my home directory and it created a `CSC548-Spring2017` directory
in my home directory.

`git clone git@github.com:548prof/CSC548-Spring2017.git`

If you already have a CSC548-Spring2017 directory, or you just want to name it
something different, you can add a name/path as a second parameter, as such:

`git clone git@github.com:548prof/CSC548-Spring2017.git repoDirName`

This will create a repoDirName directory with all of the files inside of it.
This step is where you'll most likely encounter an issue. Because of ssh
security, you'll most likely need to add your acad ssh key (which you may not
even have) to your GitHub account. If you go to account settings, you'll see an
"SSH keys" tab where you can add your public key. This will allow you read/write
access equivalent to your GitHub account. You should be able to clone the
repository once you add your public key to your account. However, you probably
won't be able to push your changes to the repository until you have been added
as a collaborator. Send an email to Dr. Rieksts or Andrew Wernicki if you want
to be able to push your changes to the repository. You will need to add a public
SSH key for any computer you wish to use. In addition, it is possible to use the
https link provided by GitHub to interact with the repository. This can be super
helpful for GitExtensions and JetBrains products.

# Creating SSH Keys

To create a key on acad (or any Unix machine) GitHub provides a pretty good
tutorial [here](https://help.github.com/articles/generating-ssh-keys/).
Generating a key for Windows is even easier, assuming you already have WinSCP.
WinSCP generally comes with a program called PuTTYgen, which I'm pretty sure can
also be downloaded on its own. To run PuTTYgen from WinSCP, simply open WinSCP
and there should be a "Tools" dropdown in the bottom left of the window. Here
you should see a "Run PuTTYgen" option.

Once PuTTYgen is running, simply click "Generate" and follow the onscreen
prompts (you'll need to move your mouse around to help generate randomness).
When the process is completed, your public key will automatically pop up on the
screen which you can then copy and paste. You can also save your public and
private keys and add a password to them if you want.

From here, simply add your public ssh key to your GitHub account. Now you can
clone and pull, and once you have been added as a collaborator, push.

# Beyond

I intend to add more basic instructions for how to commit, push, and pull with
Git in the future, but there are many resources available online. I also find it
a lot easier to work with a GUI such as GitExtensions on Windows. It is not
necessary, but is a lot more visually appealing and intuitive than working from
the command line.

Please contact awern214@live.kutztown.edu with any questions or concerns.
